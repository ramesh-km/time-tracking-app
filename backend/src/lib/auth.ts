import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SafeUser } from "../types/user";
import jwt from "jsonwebtoken";
import config from "./config";
import prisma from "./prisma";
import { getUuid } from "./utils";
import { getEmailHtml, sendEmail } from "./emails";

export async function hashPassword(password: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
}

export async function comparePasswords(password: string, passwordHash: string) {
  const passwordsMatch = await bcrypt.compare(password, passwordHash);
  return passwordsMatch;
}

export function getSafeUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    preferences: user.preferences,
  };
}

export async function generateToken(user: SafeUser) {
  const token = jwt.sign(user, config.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}

export async function createPasswordResetTicket(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const token = getUuid();

  let ticket;

  try {
    ticket = await prisma.passwordResetTicket.create({
      data: {
        token,
        userId: user.id,
      },
    });
  } catch (error) {
    throw new Error("Could not create password reset ticket");
  }

  // Create reset password url
  const params = new URLSearchParams();
  params.set("token", ticket.token);
  params.set("id", String(ticket.id));
  const resetPasswordUrl = `${
    config.FRONTEND_URL
  }/reset-password?${params.toString()}`;

  // Send email
  try {
    const html = await getEmailHtml("reset-password", {
      name: user.name,
      resetUrl: resetPasswordUrl,
    });
    await sendEmail(user.email, "Reset your password", html);
  } catch (error) {
    throw new Error("Could not send password reset email");
  }

  return ticket;
}

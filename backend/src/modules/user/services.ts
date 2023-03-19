import { PasswordResetTicket, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SafeUser } from "../../types/user";
import jwt from "jsonwebtoken";
import config from "../../lib/config";
import prisma from "../../lib/prisma";
import { getUuid } from "../../lib/utils";
import { getEmailHtml, sendEmail } from "../../lib/emails";
import { createBug } from "../../lib/issue-tracker";

export async function hashText(text: string) {
  const hash = await bcrypt.hash(text, 10);
  return hash;
}

export async function compareWithHash(text: string, textHash: string) {
  const match = await bcrypt.compare(text, textHash);
  return match;
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
  const tokenHash = await hashText(token); // Treat the token as a password
  let ticket: PasswordResetTicket;

  try {
    ticket = await prisma.$transaction(async (tx) => {
      // Mark all other tickets as invalid
      await tx.passwordResetTicket.deleteMany({
        where: {
          userId: user.id,
          invalid: "NEWER_TICKET_EXISTS",
        },
      });

      const ticket = await prisma.passwordResetTicket.create({
        data: {
          token: tokenHash,
          userId: user.id,
        },
      });

      return ticket;
    });
  } catch (error) {
    throw new Error("Could not create password reset ticket");
  }

  // Create reset password url
  const params = new URLSearchParams();
  params.set("token", token); // The token is not hashed here
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
    // Delete the ticket if the email could not be sent
    await prisma.passwordResetTicket
      .delete({
        where: {
          id: ticket.id,
        },
      })
      .catch((error) =>
        createBug(
          "Could not delete password reset ticket",
          JSON.stringify(error) + "\n" + JSON.stringify(ticket)
        )
      );
    throw new Error("Could not send password reset email");
  }

  return ticket;
}

export async function validatePasswordResetTicket(id: number, token: string) {
  // Find the ticket
  const ticket = await prisma.passwordResetTicket.findUnique({
    where: {
      id,
    },
  });

  if (!ticket || ticket.invalid !== "NONE") {
    throw new Error("Invalid password reset ticket");
  }

  // Check if the ticket is valid
  const tokensMatch = await compareWithHash(token, ticket.token);

  if (!tokensMatch) {
    throw new Error("Invalid password reset ticket");
  }

  // Get the user from the ticket id
  const user = await prisma.user.findUnique({
    where: {
      id: ticket.userId,
    },
  });

  if (!user) {
    throw new Error("Invalid password reset ticket");
  }

  // Mark the ticket as invalid
  try {
    await prisma.passwordResetTicket.update({
      where: {
        id: ticket.id,
      },
      data: {
        invalid: "ALREADY_USED",
      },
    });
  } catch (error) {
    await createBug(
      "Could not mark password reset ticket as invalid",
      JSON.stringify(error) + "\n" + JSON.stringify(ticket)
    );
    throw error;
  }

  return getSafeUser(user);
}

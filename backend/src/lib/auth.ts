import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SafeUser } from "../types/user";
import jwt from "jsonwebtoken";
import config from "./config";

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

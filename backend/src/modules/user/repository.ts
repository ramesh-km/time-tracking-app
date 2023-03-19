import { hashText } from "./services";
import prisma from "../../lib/prisma";
import { safePromise } from "../../lib/utils";
import { RegisterUserInput } from "../../types/user";
import { Prisma } from "@prisma/client";

async function createUser(data: RegisterUserInput) {
  const password = await safePromise(hashText(data.password));
  if (!password) {
    throw new Error("Could not hash password");
  }

  const user = await prisma.user.create({
    data: {
      ...data,
      password,
    },
  });
  return user;
}

async function getUserByEmail(email: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });
  return user;
}

async function updateUser(id: number, data: Prisma.UserUpdateInput) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return user;
}

const userRepository = {
  createUser,
  getUserByEmail,
  updateUser,
};

export default userRepository;

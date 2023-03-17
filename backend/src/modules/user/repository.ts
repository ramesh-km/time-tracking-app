import { hashPassword } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { safePromise } from "../../lib/utils";
import { RegisterUserInput } from "../../types/user";

async function createUser(data: RegisterUserInput) {
  const password = await safePromise(hashPassword(data.password));
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

const userRepository = {
  createUser,
  getUserByEmail,
};

export default userRepository;

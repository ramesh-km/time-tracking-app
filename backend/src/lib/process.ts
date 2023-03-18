import prisma from "./prisma";

export async function stopApplication(exitCode = 0) {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    console.error("Could not disconnect from database");
  }

  process.exit(exitCode);
}

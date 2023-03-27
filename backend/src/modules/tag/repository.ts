import prisma from "../../lib/prisma";

function create(name: string, userId: number) {
  return prisma.tag.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      name: true,
    },
  });
}

function deleteTag(name: string, userId: number) {
  return prisma.tag.delete({
    where: {
      name_userId: {
        name,
        userId,
      },
    },
    select: {
      name: true,
    },
  });
}

function getAll(includeCount = false, userId: number) {
  return prisma.tag.findMany({
    where: {
      userId,
    },
    select: {
      name: true,
      _count: includeCount,
    },
  });
}

const tagRepository = {
  create,
  delete: deleteTag,
  getAll,
};

export default tagRepository;

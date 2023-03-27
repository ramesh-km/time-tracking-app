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
  });
}

function getAll(includeCount = false, userId: number) {
  return prisma.tag.findMany({
    where: {
      userId,
    },
    include: {
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

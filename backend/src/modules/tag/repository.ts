import prisma from "../../lib/prisma";

function create(name: string) {
  return prisma.tag.create({
    data: {
      name,
    },
  });
}

function deleteTag(name: string) {
  return prisma.tag.delete({
    where: {
      name,
    },
  });
}

function getAll(includeCount = false) {
  return prisma.tag.findMany({
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

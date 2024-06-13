import { PrismaClient } from "@prisma/client";

import { fileDataloader } from "./schema/File";

const prisma = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});

prisma.$on("query", (event) => {
  console.log(`${event.query}\n`, `${event.params}\n`, `${event.duration} ms\n`);
});
const resolver = {
  file: (args: { path: string }) => {
    return fileDataloader.load(args.path);
  },
  projects: async () => {
    const projects = await prisma.project.findMany();
    return projects.map((val) => {
      return {
        ...val,
        icon: () => {
          return prisma.icon.findUnique({ where: { id: val.iconId } });
        },
        contents: () => {
          return prisma.content.findMany({ where: { projectId: val.id } });
        },
        tags: async () => {
          return prisma.tagsOnProjects
            .findMany({
              where: { projectId: val.id },
              select: {
                tag: true,
              },
            })
            .then((res) => res.map((val) => val.tag));
        },
      };
    });
  },
};
export default resolver;

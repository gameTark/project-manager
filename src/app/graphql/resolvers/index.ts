import { Content, Icon, Project, Tag } from "@prisma/client";
import {
  MutationDeleteContentArgs,
  MutationInsertContentArgs,
  MutationUpdateContentArgs,
  QueryFileArgs,
  QueryGetProjectArgs,
} from "schemas/src/generated/main/graphql";

import prisma from "./prisma";
import { fileDataloader } from "./schema/File";

// graphqlのresolver同士を
const projectSchema = (project: Project | null | undefined) => {
  if (project == null) throw new Error("project");
  const item = prisma.project.findUnique({ where: { id: project.id } });
  return {
    ...project,
    icon: () => {
      return item.icon().then((res) => {
        if (res == null) throw new Error("");
        return iconSchema(res);
      });
    },
    contents: () => {
      return item.contents().then((val) => val?.map(contentSchema) || []);
    },
    tags: () => {
      return item
        .tags({
          select: {
            tag: true,
          },
        })
        .then((res) => res?.map((val) => tagSchema(val.tag)));
    },
  };
};

const iconSchema = (icon: Icon | null | undefined) => {
  if (icon == null) throw new Error("icon is not found");
  return {
    id: icon.id,
    srcPath: icon.srcPath,
    name: icon.name,
  };
};

const tagSchema = (tag: Tag) => {
  return {
    id: tag.id,
    name: tag.name,
    color: tag.color,
    projects: async () => {
      const projects = await prisma.tag.findUnique({ where: { id: tag.id } }).projects({
        select: {
          project: true,
        },
      });
      if (projects == null) return [];
      return projects.map((val) => projectSchema(val.project));
    },
  };
};

const contentSchema = (content: Content) => {
  return {
    contentType: content.contentType,
    id: content.id,
    name: content.name,
    path: content.path,
    updatedAt: content.updatedAt,
    size: content.size,

    project: () => {
      return prisma.content
        .findUnique({ where: { id: content.id } })
        .project()
        .then((project) => projectSchema(project));
    },
    icon: () => {
      return prisma.content
        .findUnique({ where: { id: content.id } })
        .icon()
        .then((res) => iconSchema(res));
    },
  };
};

export const MUTATIONS = {
  insertContent: (_: any, args: MutationInsertContentArgs) => {
    const content = prisma.content.create({
      data: {
        name: args.name,
        projectId: args.projectId,
        path: args.path,
        iconId: args.icon || "example-icon",
      },
    });
    return content;
  },
  updateContent: (_: any, args: MutationUpdateContentArgs) => {
    const content = prisma.content.update({
      where: { id: args.id },
      data: {
        name: args.name,
        projectId: args.projectId,
        path: args.path,
        iconId: args.icon || undefined,
      },
    });
    return content;
  },
  deleteContent: async (_: any, args: MutationDeleteContentArgs) => {
    return await prisma.content
      .delete({ where: { id: args.id } })
      .then(() => true)
      .catch(() => false);
  },
};
export const QUERIES = {
  file: (_: any, args: QueryFileArgs) => {
    return fileDataloader.load(args.path);
  },
  icons: () => {
    return prisma.icon.findMany();
  },
  getProject: async (_: any, { id }: QueryGetProjectArgs) => {
    const item = await prisma.project.findUnique({ where: { id: id } });
    if (item == null) throw new Error(`project id[${id}] not found`);
    return projectSchema(item);
  },
  projects: async () => {
    const projects = await prisma.project.findMany();
    return projects.map(projectSchema);
  },
};

const resolver = {
  ...QUERIES,
  ...MUTATIONS,
};
export default resolver;

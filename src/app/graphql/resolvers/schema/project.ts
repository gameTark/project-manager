import { randomUUID } from "crypto";
import * as yup from "yup";

import db from "../../../db/sqlite";
import { BaseDataLoader } from "./BaseDataLoader";
import { content, contentByProjectIdDataloader } from "./content";
import { icon, iconDataloader } from "./icon";
import { tagByProjectIdDataloader } from "./projectTagRelation";
import { idScala } from "./scala";
import { tag } from "./tag";
import { createPrepareQuery } from "./utils";
import { createLoader } from "./BaseRelation";

export interface IProject {
  id?: string;
  title: string;
  description?: string;
  sort: number;
  iconId: string;
  tagIds: string[];
  contentIds: string[];

  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
const projectSchema: yup.ObjectSchema<IProject> = yup.object({
  id: idScala.default(randomUUID()),
  title: yup.string().required(),
  description: yup.string(),
  sort: yup.number().required(),
  iconId: idScala.required(),

  createdAt: yup.number().default(Date.now()),
  updatedAt: yup.number().default(Date.now()),
  deletedAt: yup.number(),

  tagIds: yup.array(idScala.required()).default([]),
  contentIds: yup.array(idScala.required()).default([]),
});

export const projectSelectAll = () => {
  return new Promise<IProject[]>((resolve, reject) => {
    db.all<IProject>(
      "SELECT id, title, description, sort, icon_id AS iconId, updated_at AS updatedAt FROM project",
      (err, row) => {
        if (err != null) {
          reject(err);
          return;
        }
        resolve(row);
      },
    );
  });
};

export const projectDataloader =  createLoader<Required<IProject>['id'], IProject>({
  baseQuery: (size) => `SELECT id, title, description, sort, icon_id AS iconId, updated_at AS updatedAt FROM project WHERE id IN(${createPrepareQuery(size)})`
});

export const project = (args: unknown) => {
  const value = projectSchema.cast(args);

  return {
    resolver: () => {
      return {
        ...value,
        icon: async () => {
          const v = await iconDataloader.load(value.iconId);
          return icon(v).resolver();
        },
        contents: async () => {
          if (value.id == null) return [];
          const contents = await contentByProjectIdDataloader.load(value.id);
          return contents.map((val) => content(val).resolver());
        },
        tags: async () => {
          if (value.id == null) return [];
          const tags = await tagByProjectIdDataloader.load(value.id);
          return tags.map((t) => tag(t).resolver());
        },
      };
    },
  };
};

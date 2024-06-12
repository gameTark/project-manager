import { randomUUID } from "crypto";
import * as yup from "yup";

import db from "../../../db/sqlite";
import { BaseDataLoader } from "./BaseDataLoader";
import { project } from "./project";
import { projectByTagIdDataloader } from "./projectTagRelation";
import { idScala } from "./scala";
import { createPrepareQuery } from "./utils";

const QUERY = {
  UPSERT: () =>
    "REPLACE INTO icon(id, srcPath, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
  SELECT: {
    ID: (size: number) =>
      `SELECT id, name, color, updated_at AS updatedAt FROM tag WHERE id IN(${createPrepareQuery(size)})`,
  },
};

export interface ITag {
  id?: string;
  name: string;
  color: string;
  project_ids: string[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
const tagSchema: yup.ObjectSchema<ITag> = yup.object({
  id: idScala.default(randomUUID()),
  name: yup.string().required(),
  color: yup.string().default("#eeeeee"),
  project_ids: yup.array(idScala.required()).default([]),

  createdAt: yup.date().default(new Date()),
  updatedAt: yup.date().default(new Date()),
  deletedAt: yup.date(),
});
const projectSelect = (ids: string[]) => {
  return new Promise<ITag[]>((resolve, reject) => {
    if (ids.length === 0) {
      resolve([]);
      return;
    }
    const value = db.prepare(QUERY.SELECT.ID(ids.length));
    value.all<ITag>(ids, (err, row) => {
      if (err != null) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};
class TagDataloader extends BaseDataLoader<ITag["id"], ITag> {
  protected async batchLoad(ids: Required<ITag>["id"][]): Promise<(ITag | Error)[]> {
    return projectSelect(ids);
  }
}
export const tagDataloader = new TagDataloader();
export const tag = (args: unknown) => {
  const value = tagSchema.cast(args);
  return {
    resolver: () => {
      return {
        ...value,
        projects: async () => {
          if (value.id == null) return [];
          const v = await projectByTagIdDataloader.load(value.id);
          return v.map((val) => project(val).resolver());
        },
      };
    },
  };
};

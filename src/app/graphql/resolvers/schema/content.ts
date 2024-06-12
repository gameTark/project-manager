import { randomUUID } from "crypto";
import groupBy from "just-group-by";
import * as yup from "yup";

import db from "../../../db/sqlite";
import { BaseDataLoader } from "./BaseDataLoader";
import { iconDataloader } from "./icon";
import { project, projectDataloader } from "./project";
import { idScala } from "./scala";
import { createPrepareQuery } from "./utils";

enum contentType {
  Directory = "Directory",
  File = "File",
  Software = "Software",
  Link = "Link",
}

interface IContent {
  contentType: contentType;
  id?: string;
  name: string;
  path: string;
  size?: number;

  icon_id: string;
  project_id: string;

  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}

const contentSchema: yup.ObjectSchema<IContent> = yup.object({
  contentType: yup.mixed<contentType>().oneOf(Object.values(contentType)).required(),
  id: idScala.default(randomUUID()),
  name: yup.string().required(),
  path: yup.string().required(),
  size: yup.number(),

  icon_id: idScala.required(),
  project_id: idScala.required(),

  createdAt: yup.number().default(Date.now()),
  updatedAt: yup.number().default(Date.now()),
  deletedAt: yup.number(),
});

const contentSelect = (ids: string[]): Promise<IContent[]> => {
  return new Promise((resolve, reject) => {
    if (ids.length === 0) {
      resolve([]);
      return;
    }
    const value = db.prepare(
      "SELECT id, content_type AS contentType, name, path, size, icon_id, project_id, created_at, updated_at AS updatedAt FROM content WHERE id IN(" +
        createPrepareQuery(ids.length) +
        ")",
    );
    value.all<IContent>(ids, (err, row) => {
      if (err != null) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};

const contentSelectByProjectId = (ids: string[]): Promise<IContent[][]> => {
  return new Promise((resolve, reject) => {
    const value = db.prepare(
      "SELECT id, content_type AS contentType, name, path, size, icon_id, project_id, created_at, updated_at AS updatedAt FROM content WHERE project_id IN(" +
        ids.map(() => "?").join(", ") +
        ")",
    );
    value.all<IContent>(ids, (err, row) => {
      if (err != null) {
        reject(err);
        return;
      }
      resolve(Object.values(groupBy(row, (r) => r.project_id)));
    });
  });
};

class ContentDataloader extends BaseDataLoader<IContent["id"], IContent> {
  protected async batchLoad(ids: Required<IContent>["id"][]): Promise<(IContent | Error)[]> {
    return contentSelect(ids);
  }
}

class ContentDataloaderByProjectId extends BaseDataLoader<string, IContent[]> {
  protected async batchLoad(ids: string[]): Promise<(IContent[] | Error)[]> {
    return contentSelectByProjectId(ids);
  }
}

export const contentDataloader = new ContentDataloader();
export const contentByProjectIdDataloader = new ContentDataloaderByProjectId();

export const content = (args: unknown) => {
  const value = contentSchema.cast(args);
  return {
    resolver: () => {
      return {
        ...value,
        icon: async () => await iconDataloader.load(value.icon_id),
        project: async () => {
          const p = await projectDataloader.load(value.project_id);
          return project(p).resolver();
        },
      };
    },
  };
};

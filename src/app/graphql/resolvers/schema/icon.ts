import { randomUUID } from "crypto";
import * as yup from "yup";

import db from "../../../db/sqlite";
import { BaseDataLoader } from "./BaseDataLoader";
import { idScala } from "./scala";
import { createPrepareQuery } from "./utils";

const QUERY = {
  UPSERT: () =>
    "REPLACE INTO icon(id, srcPath, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
  SELECT: {
    ID: (size: number) =>
      `SELECT id, srcPath, name, updated_at AS updatedAt FROM icon WHERE id IN(${createPrepareQuery(size)})`,
  },
};

interface IIcon {
  id?: string;
  srcPath: string;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
const iconSchema: yup.ObjectSchema<IIcon> = yup.object({
  id: idScala.default(randomUUID()),
  srcPath: yup.string().required(),
  name: yup.string().required(),

  createdAt: yup.date().default(new Date()),
  updatedAt: yup.date().default(new Date()),
  deletedAt: yup.date(),
});

const iconSelect = (ids: string[]) => {
  return new Promise<IIcon[]>((resolve, reject) => {
    if (ids.length === 0) {
      resolve([]);
      return;
    }
    const value = db.prepare(QUERY.SELECT.ID(ids.length));
    value.all<IIcon>(ids, (err, row) => {
      if (err != null) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};
class IconDataloader extends BaseDataLoader<IIcon["id"], IIcon> {
  protected async batchLoad(ids: Required<IIcon>["id"][]): Promise<(IIcon | Error)[]> {
    return iconSelect(ids);
  }
}
export const iconDataloader = new IconDataloader();

const upsert = (args: IIcon) => {
  new Promise((resolve) => {
    db.serialize(() => {
      const stmt = db.prepare(QUERY.UPSERT());
      stmt.run(args.id, args.srcPath, args.name, Number(args.createdAt), Date.now());
      stmt.finalize(resolve);
    });
  });
};

export const icon = (args: IIcon) => {
  const value = iconSchema.cast(args);
  return {
    resolver: () => {
      return {
        ...value,
      };
    },
    upsert: () => {
      return upsert(value);
    },
  };
};

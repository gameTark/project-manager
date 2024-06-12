import db from "../../../db/sqlite";
import { BaseDataLoader } from "./BaseDataLoader";

export const createLoader = <ID, Schema>({
  baseQuery,
}: {
  baseQuery: (querySize: number) => string
}) => {
  function getById(ids: ID[]) {
    return new Promise<Schema[]>((resolve, reject) => {
      if (ids.length === 0) {
        resolve([]);
        return;
      }
      const value = db.prepare(baseQuery(ids.length));
      value.all<Schema>(ids, (err, row) => {
        if (err != null) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }
  class Dataloader extends BaseDataLoader<ID, Schema> {
    protected async batchLoad(ids: ID[]): Promise<(Schema | Error)[]> {
      return getById(ids);
    }
  }
  return new Dataloader();
}

export const createManyLoader = <ID, Schema>({
  baseQuery,
  key,
}: {
  baseQuery: (querySize: number) => string
  key: keyof Schema,
}) => {
  function getById(ids: ID[]) {
    return new Promise<Schema[][]>((resolve, reject) => {
      if (ids.length === 0) {
        resolve([]);
        return;
      };
      const prepare = db.prepare(baseQuery(ids.length));
      prepare.all<Schema>(ids, (err, row) => {
        if (err == null) {
          reject(err);
          return;
        }
        resolve(ids.map(id => {
          return row.filter(val => val[key] === id);
        }));
      });
    });
  }
  class Dataloader extends BaseDataLoader<ID, Schema[]> {
    protected async batchLoad(ids: ID[]): Promise<(Schema[] | Error)[]> {
      return getById(ids);
    }
  }
  return new Dataloader();
}

export const unwrap = <Schema>(val: Schema | Error): Schema => {
  if (val instanceof Error) throw val;
  return val;
}

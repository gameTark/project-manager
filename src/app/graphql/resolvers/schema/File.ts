import fsPromise from "fs/promises";
import path from "path";
import { FileType } from "schemas/src/generated/main/graphql";

import { BaseDataLoader } from "./BaseDataLoader";

class FileDataloader extends BaseDataLoader<FileSchema["path"], FileSchema> {
  protected async batchLoad(paths: FileSchema["path"][]): Promise<(FileSchema | Error)[]> {
    console.log(paths.length);
    const result = paths.map(async (strPath) => {
      const file = await fsPromise.stat(strPath);
      return new FileSchema({
        name: path.basename(strPath),
        type: file.isDirectory() ? FileType.Directory : FileType.File,
        path: strPath,
        updatedAt: Number(file.mtime),
        size: file.size,
      });
    });
    return await Promise.all(result);
  }
}

export const fileDataloader = new FileDataloader();
export class FileSchema {
  public type: FileType;

  public path;
  public updatedAt;
  public size;
  public name;

  constructor(args: {
    path: string;
    updatedAt: number;
    size: number;
    name: string;
    type: FileType;
  }) {
    this.type = args.type;
    this.path = args.path;
    this.updatedAt = args.updatedAt;
    this.size = args.size;
    this.name = args.name;
  }

  async ls() {
    if (this.type !== FileType.Directory) return [];
    const files = await fsPromise.readdir(this.path);
    const result = await fileDataloader.loadMany(files.map((val) => path.join(this.path, val)));
    return result;
  }
}

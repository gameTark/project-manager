import fs from "fs";
import { File, FileType } from "schemas/src/generated/main/graphql";

export class FileSchema implements File {
  public type: FileType;
  public path;
  public updatedAt;
  public size;

  constructor(args: { path: string }) {
    const file = fs.statSync(args.path);
    this.type = file.isDirectory() ? FileType.Directory : FileType.File;
    this.path = args.path;
    this.updatedAt = Number(file.mtime);
    this.size = file.size;
  }
}

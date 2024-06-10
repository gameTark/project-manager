import * as path from "path";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { dayjs } from "@utils/dayjs";
import { RecursivePartial } from "@utils/type";
import { FileType, type File as TFile } from "schemas/src/generated/renderer/gql";

import { useFileTreeQuery } from "../../queries/baseQuery";

const FileItemContext = createContext<RecursivePartial<TFile> | null>(null);

const useFileContext = () => useContext(FileItemContext);
const useGetPath = () => useContext(FileItemContext)?.path;

const useChangeDirectory = (targetPath: string): [string, (path: string) => void] => {
  const [currentPath, setCurrentPath] = useState(targetPath);
  const changePath = useCallback(
    (dir: string) => {
      const result = path.join(currentPath, dir);
      setCurrentPath(result);
    },
    [currentPath],
  );
  return [currentPath, changePath];
};

// 継承系のcontextを使用してgitignore等を参照し抜く
// filter系のcontextを定義する
const ignores = (fileName?: string) =>
  [/^\./, /node_modules/].findIndex((v) => v.test(fileName || ".")) !== -1;

const Directory = (props: { children: ReactNode }) => {
  const file = useFileContext();
  // if (ignores(file?.name)) return null;
  if (file?.type === FileType.Directory) return props.children;
  return null;
};
const File = (props: { children: ReactNode }) => {
  const file = useFileContext();
  // if (ignores(file?.name)) return null;
  if (file?.type === FileType.File) return props.children;
  return null;
};
const Name = (): ReactNode => useFileContext()?.name ?? "-----";
const Path = (): ReactNode => useFileContext()?.path ?? "-----";
const Size = (): ReactNode => useFileContext()?.size ?? "-----";
const Type = (): ReactNode => useFileContext()?.type ?? "-----";
const UpdatedAt = (props: { format?: string }): ReactNode => {
  const updatedAt = useFileContext()?.updatedAt;
  if (updatedAt) return null;
  return dayjs(useFileContext()?.updatedAt).format(props.format || "YYYY/MM/DD");
};

const List = (props: { children: ReactNode }) => {
  const file = useFileContext();
  return (
    <>
      {file?.ls?.map((file) => {
        if (file?.path == null) return null;
        return (
          <FileItemContext.Provider key={file?.path} value={file}>
            {props.children}
          </FileItemContext.Provider>
        );
      })}
    </>
  );
};

const Provider = (props: { path?: string; children: ReactNode }) => {
  const path = useGetPath();
  const dataQuery = useFileTreeQuery(path || props.path || "");
  const file = dataQuery.data?.file;
  return (
    <FileItemContext.Provider
      value={{
        ...file,
      }}>
      {props.children}
    </FileItemContext.Provider>
  );
};

export const FileContext = {
  uses: {
    useChangeDirectory,
    useFileContext,
    useGetPath,
  },
  is: {
    Directory,
    File,
  },
  map: {
    List,
  },
  Name,
  Path,
  Size,
  Type,
  UpdatedAt,
  Provider,
  FileList,
};

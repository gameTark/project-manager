import { createContext, ReactNode, useContext } from "react";
import { dayjs } from "@utils/dayjs";
import { RecursivePartial } from "@utils/type";
import { type Content as TContent } from "schemas/src/generated/renderer/gql";

import { Project } from "../Project/context";

const ContentContext = createContext<RecursivePartial<TContent> | null>(null);

const useContentContext = () => useContext(ContentContext);

const Name = (): ReactNode => useContentContext()?.name;
const ContentType = (): ReactNode => useContentContext()?.contentType;
const Path = (): ReactNode => useContentContext()?.path;
const UpdatedAt = (props: { format: string }): ReactNode => {
  const updatedAt = useContentContext()?.updatedAt;
  if (updatedAt == null) return null;
  return dayjs(updatedAt).format(props.format || "YYYY/MM/DD");
};
const Size = (): ReactNode => useContentContext()?.size;
const ProjectProvider = (props: { children?: ReactNode }): ReactNode => {
  const icon = useContentContext()?.project;
  if (icon == null) return null;
  return <Project.Provider value={icon}>{props.children}</Project.Provider>;
};

export const Content = {
  Name,
  Image,
  ContentType,
  Path,
  UpdatedAt,
  Size,
  ProjectProvider,
  Provider: ContentContext.Provider,
};

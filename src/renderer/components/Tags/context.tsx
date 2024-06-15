import { createContext, ReactNode, useContext } from "react";
import { styled } from "@stitches/react";
import { RecursivePartial } from "@utils/type";
import { type Tag as TTag } from "schemas/src/generated/renderer/gql";

import { Project } from "../Project/context";

const TagContext = createContext<RecursivePartial<TTag> | null>(null);

const useTagContext = () => useContext(TagContext);

const Title = (): ReactNode => useTagContext()?.name;
const BadgeStyle = styled("span", {
  border: "1px solid #555",
  borderRadius: "4px",
  padding: "4px 2px",
});
const Badge = (): ReactNode => {
  const badge = useTagContext();
  if (badge?.color == null || badge.name == null) return null;
  return <BadgeStyle style={{ backgroundColor: badge.color }}>{badge.name}</BadgeStyle>;
};

const ProjectListProvider = (props: { children: ReactNode }) => {
  const projects = useTagContext()?.projects;
  return (
    <>
      {(projects || []).map((project) => (
        <Project.Provider value={project || null}>{props.children}</Project.Provider>
      ))}
    </>
  );
};
export const Tag = {
  Title,
  Badge,
  ProjectListProvider,
  Provider: TagContext.Provider,
};

import { createContext, ReactNode, useContext } from "react";
import { styled } from "@stitches/react";
import { getFurthestColor } from "@utils/color";
import { RecursivePartial } from "@utils/type";
import { type Tag as TTag } from "schemas/src/generated/renderer/gql";

import { Project } from "../Project/context";

const TagContext = createContext<RecursivePartial<TTag> | null>(null);

const useTagContext = () => useContext(TagContext);

const Title = (): ReactNode => useTagContext()?.name;
const BadgeStyle = styled("span", {
  display: "inline-block",
  border: "1px solid #888",
  borderRadius: "999px",
  padding: "0px 6px",
});
const Badge = (): ReactNode => {
  const badge = useTagContext();
  if (badge?.color == null || badge.name == null) return null;
  const c = getFurthestColor(badge.color);
  return <BadgeStyle style={{ backgroundColor: badge.color, color: c }}>{badge.name}</BadgeStyle>;
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

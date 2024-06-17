import { styled } from "@stitches/react";
import { useGetProjectsQuery } from "schemas/src/generated/renderer/gql";

import { Tag } from "../Tags/context";
import { Project } from "./context";

const UnorderList = styled("ul", {
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
});
const ListItem = styled("li", {});
const ProjectItem = () => {
  return (
    <li>
      <Project.Title />
      <Project.Description />
      <UnorderList>
        <Project.TagListProvider>
          <ListItem>
            <Tag.Badge />
          </ListItem>
        </Project.TagListProvider>
      </UnorderList>
    </li>
  );
};

export const ProjectList = () => {
  const projectsQuery = useGetProjectsQuery();
  return (
    <ul>
      {projectsQuery.data?.projects.map((val) => (
        <Project.Provider value={val || null} key={val?.id}>
          <ProjectItem />
        </Project.Provider>
      ))}
    </ul>
  );
};

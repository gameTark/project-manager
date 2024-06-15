import { useGetProjects } from "../../queries/baseQuery";
import { Tag } from "../Tags/context";
import { Project } from "./context";

const ProjectItem = () => {
  return (
    <li>
      <Project.Title />
      <Project.Description />
      <ul>
        <Project.TagListProvider>
          <li>
            <Tag.Badge />
          </li>
        </Project.TagListProvider>
      </ul>
    </li>
  );
};

export const ProjectList = () => {
  const projects = useGetProjects();

  return (
    <ul>
      {projects.data?.projects.map((val) => (
        <Project.Provider value={val || null} key={val?.id}>
          <ProjectItem />
        </Project.Provider>
      ))}
    </ul>
  );
};

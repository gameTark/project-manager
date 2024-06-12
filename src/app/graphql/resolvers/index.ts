import { fileDataloader } from "./schema/File";
import { project, projectSelectAll } from "./schema/project";

const resolver = {
  file: (args: { path: string }) => {
    return fileDataloader.load(args.path);
  },
  projects: async () => {
    const projects = await projectSelectAll();
    return projects.map((val) => project(val).resolver());
  },
};
export default resolver;

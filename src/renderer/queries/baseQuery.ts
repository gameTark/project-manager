import { useRequest } from "ahooks";
import DeleteProject from "schemas/src/components/delete_project_mutation.graphql?raw";
import FileFragment from "schemas/src/components/get_file_fragment.graphql?raw";
import GetIconFragment from "schemas/src/components/get_icon_fragment.graphql?raw";
import GetProjectFragment from "schemas/src/components/get_project_fragment.graphql?raw";
import GetProjectsFragment from "schemas/src/components/get_projects_fragment.graphql?raw";
import InsertProject from "schemas/src/components/insert_project_mutation.graphql?raw";
import UpdateProject from "schemas/src/components/update_project_mudation.graphql?raw";
import {
  DeleteProjectMutation,
  DeleteProjectMutationVariables,
  GetFileQuery,
  GetFileQueryVariables,
  GetIconQuery,
  GetIconQueryVariables,
  GetProjectQuery,
  GetProjectQueryVariables,
  GetProjectsQuery,
  GetProjectsQueryVariables,
  InsertProjectMutation,
  InsertProjectMutationVariables,
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
} from "schemas/src/generated/renderer/gql";

const baseGetQuery = <Result extends any, Variables extends any>(query: string) => {
  const graphql = window.mainProcess.gql;
  return async (variable: Variables): Promise<{ data: Result }> => {
    const graphqlResult = await graphql<Result, Variables>(query, variable);
    return graphqlResult;
  };
};

const getFileQuery = baseGetQuery<GetFileQuery, GetFileQueryVariables>(FileFragment);
export const useFileTreeQuery = (path: string) => {
  const query = useRequest(() => getFileQuery({ path: path }).then((res) => res.data));
  return query;
};

const getProjectQuery = baseGetQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectFragment);
export const useGetProject = (projectId: string) => {
  const query = useRequest(() => getProjectQuery({ id: projectId }).then((res) => res.data));
  return query;
};

const getProjectsQuery = baseGetQuery<GetProjectsQuery, GetProjectsQueryVariables>(
  GetProjectsFragment,
);
export const useGetProjects = () => {
  const query = useRequest(() => getProjectsQuery({}).then((res) => res.data));
  return query;
};

const getIconQuery = baseGetQuery<GetIconQuery, GetIconQueryVariables>(GetIconFragment);
export const useGetIcon = () => {
  const query = useRequest(() => getIconQuery({}).then((res) => res.data));
  return query;
};

const insertProjectMutation = baseGetQuery<InsertProjectMutation, InsertProjectMutationVariables>(
  InsertProject,
);
export const useInsertProjectMutation = (args: InsertProjectMutationVariables) => {
  const query = useRequest(() => insertProjectMutation(args).then((res) => res.data));
  return query;
};

const updateProjectMutation = baseGetQuery<UpdateProjectMutation, UpdateProjectMutationVariables>(
  UpdateProject,
);
export const useUpdateProjectMutation = (args: UpdateProjectMutationVariables) => {
  const query = useRequest(() => updateProjectMutation(args).then((res) => res.data));
  return query;
};

const deleteProjectMutation = baseGetQuery<DeleteProjectMutation, DeleteProjectMutationVariables>(
  DeleteProject,
);
export const useDeleteProjectMutation = (args: DeleteProjectMutationVariables) => {
  const query = useRequest(() => deleteProjectMutation(args).then((res) => res.data));
  return query;
};

import { useQuery } from "@tanstack/react-query";
import FileFragment from "schemas/src/components/get_file_fragment.graphql?raw";
import { GetFileQueryVariables, type GetFileQuery } from "schemas/src/generated/renderer/gql";

const baseGetQuery = <Result extends any, Variables extends any>(query: string) => {
  const graphql = window.mainProcess.gql;
  return async (variable: Variables): Promise<{ data: Result }> => {
    const hoge = await graphql<Result, Variables>(query, variable);
    return hoge;
  };
};

export const getFileQuery = baseGetQuery<GetFileQuery, GetFileQueryVariables>(FileFragment);

export const useFileTreeQuery = (path: string) => {
  const query = useQuery({
    queryKey: ["path", path],
    queryFn: () => getFileQuery({ path: path }).then((res) => res.data),
  });

  return query;
};

import { print } from "graphql";
import * as FRAGMENTS from "schemas/src/components/fragment";
import { GetFileQueryVariables, type GetFileQuery } from "schemas/src/generated/renderer/gql";

const baseGetQuery =
  <Result extends any, Variables extends any>(query: string) =>
  async (variable: Variables): Promise<{ data: Result }> => {
    return await window.mainProcess.gql<Result, Variables>(query, variable);
  };

export const getFileQuery = baseGetQuery<GetFileQuery, GetFileQueryVariables>(
  print(FRAGMENTS.GET_FILE_FRAGMENT),
);

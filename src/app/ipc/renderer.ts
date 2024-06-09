import { ipcRenderer } from "electron";

const mainProcess = {
  gql: (gqlString: string, variables?: any) => ipcRenderer.invoke("gql", gqlString, variables),
} as const;

type MainProcess = typeof mainProcess;

export type IPCRendererType = {
  MainProcess: MainProcess;
};
export const IPCRenderer = {
  mainProcess,
};

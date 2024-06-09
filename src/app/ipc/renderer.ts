import { ipcRenderer } from "electron";

const mainProcess = {
  gql: (gqlString: string) => ipcRenderer.invoke("gql", gqlString),
} as const;

type MainProcess = typeof mainProcess;

export type IPCRendererType = {
  MainProcess: MainProcess;
};
export const IPCRenderer = {
  mainProcess,
};

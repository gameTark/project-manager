// import { type IPCRendererType } from "../app/ipc/renderer";

declare module "*.graphql";

declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly NODE_ENV?: string;
        readonly DB_NAME?: string;
      }
    }
  }
}
interface Window {
  mainProcess: {
    gql: <Result = any>(
      query: string,
    ) => Promise<{
      data: Result;
    }>;
  };
}
declare var window: Window;

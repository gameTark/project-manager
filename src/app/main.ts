import { join } from "path";
import { app, BrowserWindow, ipcMain, protocol } from "electron";

import { graphqlServer } from "./graphql";
import { PROTOCOLS } from "../constants/PROTOCOL";

app.whenReady().then(() => {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: PROTOCOLS.IMAGE,
      privileges: {
        supportFetchAPI: true,
      },
    },
  ]);

  // (request: GlobalRequest) => (GlobalResponse) | (Promise<GlobalResponse>)
  // protocol.handle(PROTOCOLS.IMAGE, (req) => {
  //   return {
  //   }
  // });

  const win = new BrowserWindow({
    title: "Main window",
    width: 1000,
    height: 900,
    // 'frame': false,
    webPreferences: {
      preload: join(app.getAppPath(), "dist-electron", "preload.mjs"),
    },
  });

  win.webContents.openDevTools();

  // const resolvers  = []
  ipcMain.handle("gql", async (_e: any, query: string, variables?: any) => {
    return await graphqlServer(query, variables || {});
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(join(app.getAppPath(), "dist", "index.html"));
  }
});

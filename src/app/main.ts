import { join } from "path";
import { app, BrowserWindow, ipcMain } from "electron";

import { graphqlServer } from "./graphql";

import "./db/sqlite";

app.whenReady().then(() => {
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

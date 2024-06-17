import { join } from "path";
import { app, BrowserWindow } from "electron";

import startServer from "./main/server";

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "Main window",
    width: 1000,
    height: 900,
    webPreferences: {
      preload: join(app.getAppPath(), "dist-electron", "preload.mjs"),
    },
  });

  win.webContents.openDevTools();
  startServer();

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(join(app.getAppPath(), "dist", "index.html"));
  }
});

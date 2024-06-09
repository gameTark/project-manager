import { contextBridge } from "electron";

import { IPCRenderer } from "./ipc/renderer";

contextBridge.exposeInMainWorld("mainProcess", IPCRenderer.mainProcess);

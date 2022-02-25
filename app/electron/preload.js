const { ipcRenderer, contextBridge, screen } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (message) => ipcRenderer.send(message),
  invoke: (message) => ipcRenderer.invoke(message),
});

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require('url');
const isDev = require("electron-is-dev");
const { PythonShell } = require("python-shell");
const log = require("electron-log");

let pyshell = null;

const createRecorderWindow = () => {
  //TODO: check if window can be made click-through but draggable
  const recorderWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: "recorder",
    alwaysOnTop: true,
    show: false,
    opacity: 0.2,
    resizable: true,
    frame: true,
  });
  recorderWindow.menuBarVisible = false;
  recorderWindow.minimizable = false;
  recorderWindow.closable = false;
  recorderWindow.loadURL("http://www.google.pl");

  ipcMain.on("show", (event, data) => {
    recorderWindow.show();
    pyshell = new PythonShell("../backend/src/main.py", {
      mode: "text",
      pythonOptions: ["-u"],
      pythonPath: "../backend/venv/Scripts/python.exe",
    });
    log.info("created");
  });

  ipcMain.on("runPythonScript", (event, data) => {
    const [xpos, ypos] = recorderWindow.getPosition();
    const [width, height] = recorderWindow.getSize();
    pyshell
      .send(
        JSON.stringify({ xpos: xpos, ypos: ypos, width: width, height: height })
      )
      .end(function (err, code, signal) {
        if (err) throw err;
      });
    log.info("sent");
  });

  ipcMain.on("hide", (event, data) => {
    recorderWindow.hide();
    pyshell.kill();
    log.info("done");
    pyshell = null;
  });
};

const createMainWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Loading...",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  if (isDev) mainWindow.loadURL("http://localhost:3000");
  else mainWindow.loadURL(startUrl);
  // mainWindow.loadURL(startUrl);
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createMainWindow();
  createRecorderWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

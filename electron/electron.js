// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  shell,
  screen,
} = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const { execFile } = require("child_process");
const log = require("electron-log");

//References for shared variables
let child = null;
let savePath = path.join(app.getPath("home"), "/Desktop/pyscreens/");
const pythonScriptPath = isDev
  ? "./python/src/dist/main/main.exe"
  : "./resources/app.asar.unpacked/build/main/main.exe";
const recorderBackgroundPath = isDev
  ? `file://${path.join(__dirname, "/../public/recorderBackground.html")}`
  : `file://${path.join(__dirname, "/../recorderBackground.html")}`;

const getDefaultSaveDirectory = () => {
  return savePath;
};

const selectSaveDir = async (event, arg) => {
  temp = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  savePath = temp.filePaths[0];
  return savePath;
};

const getMonitorAmount = () => {
  return screen.getAllDisplays().length;
};

const getAppVersion = () => {
  return app.getVersion();
};

const getElectronVersion = () => {
  return process.versions.electron;
};

const createRecorderWindow = () => {
  const recorderWindow = new BrowserWindow({
    width: 400,
    height: 300,
    minWidth: 400,
    minHeight: 300,
    title: "recorder",
    show: false,
    opacity: 0.75,
  });
  recorderWindow.menuBarVisible = false;
  recorderWindow.closable = false;

  recorderWindow.loadURL(recorderBackgroundPath);

  let savePathWithDatedFolder;

  ipcMain.on("show", () => {
    recorderWindow.show();
    log.info("created");
  });

  ipcMain.on("runPythonScript", () => {
    const frameWidth = 3;
    const offset = {
      x: 18 + frameWidth,
      y: 41 + frameWidth,
      w: 18 + 18 + 2 * frameWidth,
      h: 18 + 41 + 2 * frameWidth,
    };
    const [xpos, ypos] = recorderWindow.getPosition();
    const [width, height] = recorderWindow.getSize();
    recorderWindow.hide();

    child = execFile(pythonScriptPath, ["-u"], (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }
      savePathWithDatedFolder = path.join(stdout);
      shell.openPath(savePathWithDatedFolder);
    });

    child.stdin.write(
      JSON.stringify({
        xpos: xpos + offset.x,
        ypos: ypos + offset.y,
        width: width - offset.w,
        height: height - offset.h,
      }) +
        "\n" +
        savePath
    );
    child.stdin.end((err) => {
      if (err) throw err;
    });
    log.info("sent");
  });

  ipcMain.on("hide", () => {
    setTimeout(() => {
      child.kill();
      log.info("done");
      child = null;
    }, 330);
  });
};

const createMainWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 510,
    height: 290,
    resizable: isDev,
    title: "Loading...",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
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

  if (isDev) mainWindow.webContents.openDevTools();
  mainWindow.menuBarVisible = isDev;

  mainWindow.on("closed", () => app.exit(0));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle("select-save-dir", selectSaveDir);
  ipcMain.handle("get-default-save-path", getDefaultSaveDirectory);
  ipcMain.handle("monitor-amount", getMonitorAmount);
  ipcMain.handle("app-version", getAppVersion);
  ipcMain.handle("electron-version", getElectronVersion);
  createMainWindow();
  createRecorderWindow();

  app.on("activate", () => {
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
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const iconPath = path.join(__dirname, "servers.png");
const { exec } = require("child_process");

let tray = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // show: false,
    title: "Some title for the executable",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Close server",
      click: () => {
        exec(`taskkill -F -IM node.exe`, exitApp);
        function exitApp() {
          app.quit();
        }
      },
    },
  ]);
  tray.setToolTip("PI Command Center - logger server");
  tray.setContextMenu(contextMenu);

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")

function createWindow() {
  const preloadPath = path.join(__dirname, "preload.js")
  console.log("Preload path:", preloadPath)

  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"))
  }

  win.webContents.openDevTools()
}

ipcMain.handle("open-folder-path-dialog", () => {
  return dialog.showOpenDialogSync({properties: ["openDirectory"]})
})

app.whenReady().then(createWindow)

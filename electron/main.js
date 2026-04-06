const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")
const fs = require("fs")

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
    title: "Project organizer",
    thickFrame: true
  })
  

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"))
  }
}

ipcMain.handle("open-folder-path-dialog", () => {
  return dialog.showOpenDialogSync({properties: ["openDirectory"]})
})

ipcMain.handle("open-python-path-dialog", () => {
  return dialog.showOpenDialogSync({properties: ["openFile"], filters: [
    {extensions: ["exe", ""], name: "python"}
  ]})
})


ipcMain.on("read-logs", (event, logPath) => {
  fs.readFile(logPath, (err, buffer) => {
    if(err !== null){
      console.error(err.message);
      return;
    }
    
    event.sender.send("log-lines", buffer.toString("utf8").split("\n").filter((value) => value.trim().length > 0).map((value) => JSON.parse(value)))
  })
})

ipcMain.on("watch-log", (event, logPath) => {  // <-- receives path
    let fileSize = 0;

  const waitForFile = setInterval(() => {
    if (!fs.existsSync(logPath)) return;
    clearInterval(waitForFile);

    const readNewBytes = () => {
      try {
        const stat = fs.statSync(logPath);
        if (stat.size <= fileSize) return;

        const buffer = Buffer.alloc(stat.size - fileSize);
        const fd = fs.openSync(logPath, "r");
        fs.readSync(fd, buffer, 0, buffer.length, fileSize);
        fs.closeSync(fd);

        fileSize = stat.size;

        event.sender.send("log-lines", buffer.toString("utf8").split("\n").filter((value) => value.trim().length > 0).map((value) => JSON.parse(value)))
      } catch (err) {}
    };

    const tailer = setInterval(readNewBytes, 200);

    ipcMain.once("stop-watch", () => {
      clearInterval(tailer);
      readNewBytes(); // <-- flush whatever was written since last poll
    });
  }, 100);
});

app.whenReady().then(createWindow)

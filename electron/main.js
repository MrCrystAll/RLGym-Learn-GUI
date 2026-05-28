const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")
const fs = require("fs")
const net = require('net')
const http = require('http')
const { spawn, execSync } = require('child_process')

let pyProcess = null;

// Find a free port
function getFreePort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
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


ipcMain.handle("read-logs", (event, logPath) => {
  return fs.readFileSync(logPath).toString("utf8").split("\n").filter((value) => value.trim().length > 0).map((value) => JSON.parse(value))
})

function waitForApi(port, retries = 20){
    return new Promise((resolve, reject) => {
      const attempt = () => {
        const req = http.get(`http://localhost:${port}/health`, (res) => {
          if (res.statusCode === 200) resolve();
          else if (retries-- > 0) setTimeout(attempt, 500);
          else reject(new Error('API never ready'));
        });
        req.on('error', () => {
          if (retries-- > 0) setTimeout(attempt, 500);
          else reject(new Error('API never ready'));
        });
      };
      attempt();
    });
  }


ipcMain.handle("start-api", async () => {
  if(app.isPackaged){
    if(pyProcess !== null) return Promise.reject(new Error("A process is already running", {cause: "Repeat"}));
    // Path to bundled binary (PyInstaller output)
    const port = process.env.API_PORT;
    // const apiPath = path.join(process.resourcesPath, process.platform === "win32" ? "api.exe" : "api");
    const apiPath = path.join(__dirname, '../../RLGym-Learn-API/dist/main.exe')

    pyProcess = spawn(apiPath, ['--port', String(port)], {
      detached: process.platform !== 'win32', // creates a process group on Linux/Mac
    });

    pyProcess.stderr.on('data', (d) => console.error('[API]', d.toString()));

    return waitForApi(port, 50);
  }
  return waitForApi(8000, 25);
})

ipcMain.on("watch-log", (event, logPath, receiver) => {  // <-- receives path
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

        event.sender.send("log-lines-" + receiver, buffer.toString("utf8").split("\n").filter((value) => value.trim().length > 0).map((value) => JSON.parse(value)))
      } catch (err) {}
    };

    const tailer = setInterval(readNewBytes, 200);

    ipcMain.once("stop-watch-" + receiver, () => {
      clearInterval(tailer);
      readNewBytes(); // <-- flush whatever was written since last poll
    });
  }, 100);
});

app.whenReady().then(async () => {
  if (app.isPackaged){
    const port = await getFreePort();
    process.env.API_PORT = port;  // preload picks this up
  }

  createWindow();
});

app.on('before-quit', () => {
  if (!pyProcess) return;
  if (process.platform === 'win32') {
    // Windows: taskkill kills the process AND all its children
    execSync(`taskkill /pid ${pyProcess.pid} /T /F`);
  } else {
    // Linux/Mac: kill the process group (negative pid = whole group)
    process.kill(-pyProcess.pid, 'SIGTERM');
  }
});
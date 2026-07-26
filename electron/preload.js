const {contextBridge, ipcRenderer} = require("electron");

let pyProcess = null;

contextBridge.exposeInMainWorld('electron', {
  apiPort: process.env.API_PORT  // set by main.js before spawning renderer
});

contextBridge.exposeInMainWorld('api', {
  openPathDialog(isFolder, extensions, name, defaultPath){
    return ipcRenderer.invoke("open-explorer-dialog", isFolder, extensions, name, defaultPath);
  },
  watchLog(logPath, receiver){
    return ipcRenderer.send("watch-log", logPath, receiver);
  },
  // 3. Listen for lines
  listenLines(setLines, receiver){
    ipcRenderer.on("log-lines-" + receiver, (_, entry) => {
      setLines((prev) => [...prev, ...entry]);
    });
  },
  stopWatch(receiver){
    ipcRenderer.send("stop-watch-" + receiver);
  },
  removeAllListeners(receiver){
    ipcRenderer.removeAllListeners("log-lines-" + receiver);
  },
  readLogs(logPath){
    return ipcRenderer.invoke("read-logs", logPath);    
  },
  async start(){
      return ipcRenderer.invoke("start-api");
  },
  quit(){
    return ipcRenderer.send("quit")
  },
  openLink(link){
    return ipcRenderer.invoke("open-link", link);
  }
});
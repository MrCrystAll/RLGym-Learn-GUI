const {contextBridge, ipcRenderer} = require("electron");

let pyProcess = null;

contextBridge.exposeInMainWorld('electron', {
  apiPort: process.env.API_PORT  // set by main.js before spawning renderer
});

contextBridge.exposeInMainWorld('api', {
  openFolderPathDialog(){
      return ipcRenderer.invoke("open-folder-path-dialog");
  },
  openPythonPathDialog(){
    return ipcRenderer.invoke("open-python-path-dialog");
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
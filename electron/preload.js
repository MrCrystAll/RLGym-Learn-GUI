const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('api', {
  openFolderPathDialog(){
      return ipcRenderer.invoke("open-folder-path-dialog");
  },
  openPythonPathDialog(){
    return ipcRenderer.invoke("open-python-path-dialog");
  },
  watchLog(logPath){
    return ipcRenderer.send("watch-log", logPath);
  },
  // 3. Listen for lines
  listenLines(setLines, maxLines){
    ipcRenderer.on("log-lines", (_, entry) => {
      setLines((prev) => {
        console.log(prev, entry);
        
        const updated = [...prev, ...entry];
        return maxLines ? updated.slice(-maxLines) : updated;  // keep only latest n
      });
    });
  },
  stopWatch(){    
    ipcRenderer.send("stop-watch");
  },
  removeAllListeners(){
    ipcRenderer.removeAllListeners("log-line");
  },
  readLogs(logPath){
    ipcRenderer.send("read-logs", logPath);
  }
});
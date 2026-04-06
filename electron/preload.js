const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('api', {
  openFolderPathDialog(){
      return ipcRenderer.invoke("open-folder-path-dialog");
  },
  openPythonPathDialog(){
    return ipcRenderer.invoke("open-python-path-dialog");
  },
  watchLog(logPath){
    console.log("Starting watch");
    return ipcRenderer.send("watch-log", logPath);
  },
  // 3. Listen for lines
  listenLines(setLines, maxLines){
    console.log("Listening to logs");
    ipcRenderer.on("log-lines", (_, entry) => {
      setLines((prev) => {
        console.log(prev, entry);
        
        const updated = [...prev, ...entry];
        return maxLines ? updated.slice(-maxLines) : updated;  // keep only latest n
      });
    });
  },
  stopWatch(){
    console.log("Stopping watch");
    
    ipcRenderer.send("stop-watch");
  },
  removeAllListeners(){
    ipcRenderer.removeAllListeners("log-line");
  },
  readLogs(logPath){
    console.log("Reading logs");
    
    ipcRenderer.send("read-logs", logPath);
  }
});
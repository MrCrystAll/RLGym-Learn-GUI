const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('api', {
  openFolderPathDialog(){
      return ipcRenderer.invoke("open-folder-path-dialog")
  }
});
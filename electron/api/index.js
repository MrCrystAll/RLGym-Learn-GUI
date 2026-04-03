const {ipcRenderer} = require("electron")

const openFolderPathDialog = () => {
    ipcRenderer.send("open-folder-path-dialog")
}

export default {
    openFolderPathDialog
}
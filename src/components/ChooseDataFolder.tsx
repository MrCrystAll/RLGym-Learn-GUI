interface ChooseDataFolderArgs{
    setFolderPath: (path: string) => void
    getAllProjects: (path: string) => void
}

function ChooseDataFolder({setFolderPath, getAllProjects}: ChooseDataFolderArgs) {
    const openDialog = () => {
        const result: Promise<string[] | undefined> = window.api.openFolderPathDialog();
        result.then(
            (value: string[] | undefined) => {
                if(value === undefined) return;
                else {
                    setFolderPath(value[0].normalize());
                    getAllProjects(value[0].normalize());
                }
            }
        )
        
    }

  return (
    <button className="btn btn-light" onClick={openDialog}>
        Choose data folder
        <i className="bi bi-folder ms-2"></i>
    </button>
  )
}

export default ChooseDataFolder

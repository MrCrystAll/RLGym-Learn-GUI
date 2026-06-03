interface ChooseDataFolderArgs{
    setFolderPath: (path: string) => void
    text: string
}

function ChooseDataFolder({setFolderPath, text}: ChooseDataFolderArgs) {
    const openDialog = () => {
        const result: Promise<string[] | undefined> = window.api.openFolderPathDialog();
        result.then(
            (value: string[] | undefined) => {
                if(value === undefined) return;
                else {
                    setFolderPath(value[0].normalize());
                }
            }
        )
        
    }

  return (
    <button className="btn btn-light" onClick={openDialog}>
        {text}
        <i className="bi bi-folder ms-2"></i>
    </button>
  )
}

export default ChooseDataFolder

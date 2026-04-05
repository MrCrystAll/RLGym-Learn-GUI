function ChooseDataFolder({setFolderPath, getAllProjects}) {
    const openDialog = () => {
        const result: Promise<string[] | undefined> = window.api.openFolderPathDialog();
        result.then(
            (value: string[] | undefined) => {
                if(value === undefined) setFolderPath(undefined);
                else {
                    setFolderPath(value[0].normalize());
                    getAllProjects(value[0].normalize());
                }
            }
        )
        
    }

  return (
    <button className="btn btn-success" onClick={openDialog}>Choose data folder</button>
  )
}

export default ChooseDataFolder

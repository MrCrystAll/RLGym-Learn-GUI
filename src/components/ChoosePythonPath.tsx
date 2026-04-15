interface ChoosePythonPathArgs{
    setPythonPath: (path: string) => void
}

function ChoosePythonPath({setPythonPath}: ChoosePythonPathArgs) {
    const openDialog = () => {
        const result: Promise<string[] | undefined> = window.api.openPythonPathDialog();
        result.then(
            (value: string[] | undefined) => {
                if(value === undefined) return;
                else {
                    setPythonPath(value[0].normalize());
                }
            }
        )
        
    }

  return (
    <button className="btn border" onClick={openDialog}>
        <i className="bi bi-pencil-fill text-white"></i>
    </button>
  )
}

export default ChoosePythonPath

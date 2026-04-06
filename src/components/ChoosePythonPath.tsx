// For now unused, but will be reused to update per project

function ChoosePythonPath({setPythonPath}) {
    const openDialog = () => {
        const result: Promise<string[] | undefined> = window.api.openPythonPathDialog();
        result.then(
            (value: string[] | undefined) => {
                if(value === undefined) setPythonPath(undefined);
                else {
                    setPythonPath(value[0].normalize());
                }
            }
        )
        
    }

  return (
    <button className="btn btn-success" onClick={openDialog}>Choose python path</button>
  )
}

export default ChoosePythonPath

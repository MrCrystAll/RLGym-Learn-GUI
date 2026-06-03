import ChooseDataFolder from "./ChooseDataFolder"

interface IdleFolderPathConfig{
  getAllProjects: (path: string) => void,
  setFolderPath: (path: string) => void
}

function IdleFolderPath({getAllProjects, setFolderPath}: IdleFolderPathConfig){
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column bg-dark">
        <h4 className="fw-medium text-white mb-3">To use the application, you need to set a path to store the projects</h4>
        <ChooseDataFolder getAllProjects={getAllProjects} setFolderPath={setFolderPath}></ChooseDataFolder>
      </div>
    )
}

export default IdleFolderPath

import { useEffect } from "react";
import IdleAPI from "./components/IdleAPI";
import IdleFolderPath from "./components/IdleFolderPath";
import { useApp } from "./hooks/useApp";
import ProjectEditor from "./components/ProjectEditor";
import { NotificationContainer } from "./components/NotificationContainer";
import { ProjectList } from "./components/ProjectList";
import { useProjects } from "./hooks/useProjects";
import packageJson from "../package.json"

function App() {
  // API
  const {error, startingAPI, isBugged, setCurrentProject, currentProject, startApi, folderPath, setFolder} = useApp();

  // Projects
  const {projects, addProject, updateProject, deleteProject} = useProjects({folderPath});

  useEffect(() => {
    startApi();
  }, [])

  const appRender = () => {
    if(startingAPI)
  {
    return (
      <IdleAPI isBugged={isBugged} error={error} startingAPI={startingAPI}></IdleAPI>
      )
  }
  else if(folderPath === null){
    return (
      <IdleFolderPath setFolderPath={setFolder}></IdleFolderPath>
    )
  }
  else{
    return projectRender();
  }
  }

  const projectRender = () => {
    const header = <div className="d-flex justify-content-between border-bottom mx-2">
          <h1>RLGym-Learn GUI</h1>
          <p className="align-self-center">Version {packageJson.version}</p>
        </div>
    if(currentProject === null){
      return (
        <div className="p-3">
          {header}
          <p className="mt-3">This is the project list, you can add and access your projects from here</p>
          <ProjectList addProject={addProject} projects={projects} folderPath={folderPath} setCurrentProject={setCurrentProject} setFolderPath={setFolder}></ProjectList>
        </div>
      )
    }
    else{
      return (
        <div className="p-3">
          {header}
          <ProjectEditor setCurrentProject={setCurrentProject} updateProjectList={updateProject} removeProject={deleteProject} project={projects[currentProject]}/>
        </div>
    )}
  }

  return (
    <div className="bg-dark text-light">
        <div className="bg-dark text-light">
          {appRender()}
        </div>
        <NotificationContainer></NotificationContainer>
    </div>
  )

  
}

export default App

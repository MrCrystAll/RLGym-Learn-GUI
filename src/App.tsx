
import { useEffect } from "react";
import IdleAPI from "./components/IdleAPI";
import IdleFolderPath from "./components/IdleFolderPath";
import { useApp } from "./hooks/useApp";
import ProjectEditor from "./components/ProjectEditor";
import { NotificationContainer } from "./components/NotificationContainer";
import { ProjectList } from "./components/ProjectList";
import { useProjects } from "./hooks/useProjects";

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

  else if(currentProject === null){
      return (
        <ProjectList addProject={addProject} projects={projects} folderPath={folderPath} setCurrentProject={setCurrentProject} setFolderPath={setFolder}></ProjectList>
    )
  }
  else{
    return (
      <ProjectEditor setCurrentProject={setCurrentProject} updateProjectList={updateProject} removeProject={deleteProject} project={projects[currentProject]}/>
  )}
  }

  return (
    <>
        {appRender()}
        <NotificationContainer></NotificationContainer>
    </>
  )

  
}

export default App

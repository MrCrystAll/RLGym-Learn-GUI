
import { useEffect } from "react";
import AddProject from "./components/AddProject"
import ProjectInfo from "./components/ProjectInfo";
import IdleAPI from "./components/IdleAPI";
import IdleFolderPath from "./components/IdleFolderPath";
import { useApp } from "./hooks/useApp";
import { useProjects } from "./hooks/useProjects";
import ProjectEditor from "./components/ProjectEditor";
import { NotificationContainer } from "./components/NotificationContainer";
import ChooseDataFolder from "./components/ChooseDataFolder";

function App() {
  // API
  const {error, startingAPI, isBugged, startApi} = useApp();

  // Projects
  const {currentProject, projects, folderPath, addProject, updateProject, setCurrentProject, fetchProjects, deleteProject, setFolder} = useProjects();

  const addProjectFromName = async (name: string) => {
    
    addProject({
      name: name
    });
  }

  useEffect(() => {
    startApi();
  }, [])

  const removeProject = async (projectId: string) => {
    deleteProject(projectId);
  }

  const projectsRender = () => {
    if(Object.keys(projects).length > 0){
      return (
        <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr fr"}}>
          {Object.values(projects).map(
            (metadata, index) => {
              return <ProjectInfo project={metadata} key={index} setCurrentProject={() => setCurrentProject(metadata.id)}></ProjectInfo>
            }
          )}
        </div>
      )
    }
    else{
      return (
        <p>No projects found.</p>
      )
    }
  }

  const appRender = () => {
    if(startingAPI)
  {
    return (
      <IdleAPI isBugged={isBugged} error={error} startingAPI={startingAPI}></IdleAPI>
      )
  }
  else if(folderPath === null){
    return (
      <IdleFolderPath getAllProjects={fetchProjects} setFolderPath={setFolder}></IdleFolderPath>
    )
  }

  else if(currentProject === null){
      return (
    <div className="bg-dark text-light">
      <div className="container-fluid pt-3">
        <ChooseDataFolder text="Update data folder" getAllProjects={fetchProjects} setFolderPath={setFolder}></ChooseDataFolder>
        <AddProject addProject={addProjectFromName}></AddProject>
      </div>
      <div className="m-2">
        <p className="display-3">Projects: </p>
        <small className="my-3"><i className="bi bi-folder me-3"></i>{folderPath}</small>
        <div className="border p-3">
          {projectsRender()}
        </div>
      </div>
    </div>
  )
  }
  else{
    return (
      <ProjectEditor setCurrentProject={setCurrentProject} updateProjectMetadata={updateProject} removeProject={removeProject} projectMetadata={projects[currentProject]}/>
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

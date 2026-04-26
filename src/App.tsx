
import { useEffect } from "react";
import AddProject from "./components/AddProject"
import ProjectInfo from "./components/ProjectInfo";
import IdleAPI from "./components/IdleAPI";
import IdleFolderPath from "./components/IdleFolderPath";
import { useApp } from "./hooks/useApp";
import { useProjects } from "./hooks/useProjects";
import ProjectEditor from "./components/ProjectEditor";

function App() {
  // API
  const {isAPIReady, refreshingAPI, checkAPIConnection} = useApp();

  // Projects
  const {currentProject, projectFetchError, projects, folderPath, addProject, updateProjectMetadata, updateProject, setCurrentProject, fetchProjects, deleteProject, setFolder, startProjectEntrypoint, stopProjectEntrypoint, processStates} = useProjects();

  const addProjectFromName = async (name: string) => {

    checkAPIConnection();
    
    addProject({
      name: name
    });
  }

  useEffect(() => {
    checkAPIConnection();
  }, [])

  const removeProject = async (projectId: string) => {
    checkAPIConnection();

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


  if(!isAPIReady)
  {
    return (
      <IdleAPI checkAPIConnection={checkAPIConnection} refreshingAPIStatus={refreshingAPI}></IdleAPI>
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
        <AddProject addProject={addProjectFromName}></AddProject>
      </div>
      <p className="text-danger">{projectFetchError?.message}</p>

      <div className="m-2">
        <p className="display-3">Projects: </p>
        {projectsRender()}
      </div>
    </div>
  )
  }
  else{
    return (
      <ProjectEditor fetchProjectMetadata={updateProjectMetadata} startProjectEntrypoint={startProjectEntrypoint} stopProjectEntrypoint={stopProjectEntrypoint} processStates={processStates} setCurrentProject={setCurrentProject} updateProjectMetadata={updateProject} removeProject={removeProject} projectMetadata={projects[currentProject]}/>
  )}

  
}

export default App

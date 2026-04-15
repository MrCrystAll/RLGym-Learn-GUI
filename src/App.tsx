
import { useEffect, useState } from "react";
import AddProject from "./components/AddProject"
import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ProjectMetadata } from "./models/project";
import ProjectInfo from "./components/ProjectInfo";
import { BASE_URL } from "./api";
import IdleAPI from "./components/IdleAPI";
import IdleFolderPath from "./components/IdleFolderPath";
import ProjectEditor from "./components/ProjectEditor";

function App() {
  const [folderPath, setFolderPath] = useState<string | undefined>();
  const [projectList, setProjectList] = useState<ProjectMetadata[]>([]);
  const [error, setError] = useState("");
  const [currentProject, setCurrentProject] = useState<ProjectMetadata>();

  // API
  const [apiStatus, setApiStatus] = useState(false);
  const [refresingApiStatus, setRefreshingApiStatus] = useState(false);


  const addProject = async (name: string) => {
    if(folderPath === undefined) {
      setError("You need to specify a folder path to add a project")
      return
    }

    const project: ProjectMetadata = {
      id: crypto.randomUUID(),
      name: name,
      path: undefined
    }

    axios({
      method: 'post',
      url: `${BASE_URL}/create`,
      headers: {}, 
      data: {
        path: folderPath,
        metadata: project
      }
    }).then(
      (value) => {setProjectList([...projectList, value.data.project.metadata]); setError("");
      }
    ).catch(
      (reason: AxiosError) => {setError(
        `Error while adding a project: ${reason.message}`
      );}
      
    )
  }

  const checkAPIConnection = () => {
    setRefreshingApiStatus(true);
    axios({
      method: "GET",
       baseURL: `${BASE_URL}/`,
       headers: {},
       data: {},
       timeout: 1000
    }).then(
      () => {setApiStatus(true); setRefreshingApiStatus(false);}
    ).catch(() => {setApiStatus(false); setRefreshingApiStatus(false)});
  }

  useEffect(() => {
    checkAPIConnection();
  }, [])

  const getAllProjects = async (path: string) => {

    checkAPIConnection();

    if(path === undefined) {
      setError("You need to specify a folder path to fetch projects")
      return
    }
    axios({
      method: "POST",
      url: `${BASE_URL}/all`,
      headers: {},
      data: {
          path: path
      },

    }).then(
      (response: AxiosResponse) => {setProjectList(response.data.projects); setError("");
      }
    ).catch(
      (reason: AxiosError) => {setError(`Error while fetching projects: ${reason.message}`);}
    )
  }

  const removeProject = async (metadata: ProjectMetadata) => {
    axios({
      method: "DELETE",
      baseURL: `${BASE_URL}/project/delete`,
      headers: {},
      data: {
        metadata: metadata
      }
    }).then(
      () => {setProjectList(projectList.filter((meta: ProjectMetadata) => meta.id !== metadata.id))}
    ).catch(
      (reason: AxiosError) => {setError(reason.message)}
    )
  }

  const updateProject = (project: ProjectMetadata) => {
    const filteredList = projectList.filter((meta: ProjectMetadata) => meta.id !== project.id)
    
    setProjectList([...filteredList, project])

    if(project.id == currentProject?.id)
    {
      setCurrentProject(project);
    }
  }

  const startProjectEntrypoint = (project: ProjectMetadata, callback: () => void) => {
    axios({
      method: "POST",
      baseURL: `${BASE_URL}/project/start`,
      headers: {},
      data: {
        metadata: project
      }
    }).then(
      () => callback()
    )
  }

  const projects = () => {
    if(projectList.length > 0){
      return (
        <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr fr"}}>
          {projectList.map((project, i) => <ProjectInfo project={project} setCurrentProject={setCurrentProject} key={i}></ProjectInfo>)}
        </div>
      )
    }
    else{
      return (
        <p>No projects found.</p>
      )
    }
  }


  if(!apiStatus)
  {
    return (
      <IdleAPI checkAPIConnection={checkAPIConnection} refreshingAPIStatus={refresingApiStatus}></IdleAPI>
      )
  }
  else if(folderPath === undefined){
    return (
      <IdleFolderPath getAllProjects={getAllProjects} setFolderPath={setFolderPath}></IdleFolderPath>
    )
  }

  else if(currentProject === undefined){
      return (
    <div className="bg-dark text-light">
      <div className="container-fluid pt-3">
        <AddProject addProject={addProject}></AddProject>
      </div>
      <p className="text-danger">{error}</p>

      <div className="m-2">
        <p className="display-3">Projects: </p>
        {projects()}
      </div>
    </div>
  )
  }
  else{
    return (
      <ProjectEditor checkAPIStatus={checkAPIConnection} startProjectEntrypoint={startProjectEntrypoint} setCurrentProject={setCurrentProject} updateProjectMetadata={updateProject} removeProject={removeProject} projectMetadata={currentProject}/>
  )}

  
}

export default App

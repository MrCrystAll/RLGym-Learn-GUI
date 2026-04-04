
import { useState } from "react";
import AddProject from "./components/AddProject"
import ChooseDataFolder from "./components/ChooseDataFolder";
import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ProjectMetadata } from "./models/project";
import ProjectInfo from "./components/ProjectInfo";
import Project from "./components/Project";

const BASE_URL: string = "http://localhost:8000"

function App() {
  const [folderPath, setFolderPath] = useState();
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState("");
  const [currentProject, setCurrentProject] = useState();

  const addProject = async () => {
    if(folderPath === undefined) {
      setError("You need to specify a folder path to add a project")
      return
    }

    const project: ProjectMetadata = {
      id: "aaaa",
      name: "Test",
      version: "0.0.1",
      description: "A test"
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
        `Error while adding a project: ${reason.response?.data}`
      );}
      
    )
  }

  const getAllProjects = async () => {
    if(folderPath === undefined) {
      setError("You need to specify a folder path to fetch projects")
      return
    }
    axios({
      method: "POST",
      url: `${BASE_URL}/all`,
      headers: {},
      data: {
          path: folderPath
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
      (value: AxiosResponse) => {setProjectList(projectList.filter((meta: ProjectMetadata) => meta.id != metadata.id))}
    ).catch(
      (reason: AxiosError) => {setError(reason.message)}
    )
  }

  if(currentProject === undefined){
      return (
    <div className="m-2">
      <button className="btn btn-danger" onClick={getAllProjects}>Get all projects</button>
      <AddProject addProject={addProject}></AddProject>
      <ChooseDataFolder setFolderPath={setFolderPath}></ChooseDataFolder>

      <p>{folderPath}</p>
      <p className="text-danger">{error}</p>

      <div className="my-2">
        {projectList.map((project, i) => <ProjectInfo project={project} setCurrentProject={setCurrentProject} key={i}></ProjectInfo>)}
      </div>
    </div>
  )
  }
  else{
    return (
      <Project setCurrentProject={setCurrentProject} removeProject={removeProject} projectMetadata={currentProject}></Project>
  )}

  
}

export default App

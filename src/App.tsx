
import { useState } from "react";
import AddProject from "./components/AddProject"
import ChooseDataFolder from "./components/ChooseDataFolder";
import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ProjectMetadata } from "./models/project";
import ProjectInfo from "./components/ProjectInfo";

function App() {
  const [folderPath, setFolderPath] = useState();
  const [projectList, setProjectList] = useState([]);

  const addProject = async () => {
    if(folderPath === undefined) {
      console.error("Don't");
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
      url: "http://localhost:8000/create",
      headers: {}, 
      data: {
        path: folderPath,
        metadata: project
      }
    }).then(
      (value) => {setProjectList([...projectList, value.data.project.metadata])
      }
    ).catch(
      (reason: AxiosError) => console.error(reason.response?.data)
      
    )
  }

  const getAllProjects = async () => {
    axios({
      method: "POST",
      url: "http://localhost:8000/all",
      headers: {},
      data: {
          path: folderPath
      },

    }).then(
      (response: AxiosResponse) => {setProjectList(response.data.projects); console.log(response.data.projects);
      }
    )
  }

  return (
    <div className="m-2">
      <button className="btn btn-danger" onClick={getAllProjects}>Get all projects</button>
      <AddProject addProject={addProject}></AddProject>
      <ChooseDataFolder setFolderPath={setFolderPath}></ChooseDataFolder>

      <p>{folderPath}</p>

      <div className="my-2">
        {projectList.map((project, i) => <ProjectInfo project={project} key={i}></ProjectInfo>)}
      </div>
    </div>
  )
}

export default App

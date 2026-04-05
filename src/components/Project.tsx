import { useEffect, useState } from "react"
import ActionButtons from "./project/ActionButtons"
import ProjectMetadata from "./project/ProjectMetadata"
import axios, { type AxiosResponse } from "axios";
import ProjectData from "./project/ProjectData";

function Project({projectMetadata, setCurrentProject, removeProject}) {

    const [projectData, setProjectData] = useState();

    const fetchProjectData = async () => {
        axios({
            method: "POST",
            baseURL: "http://localhost:8000/project/getDetails",
            headers: {},
            data: {
                metadata: projectMetadata
            }
        }).then(
            (response: AxiosResponse) => {setProjectData(response.data.project_data);}
        )
    }

    useEffect(() => {
        fetchProjectData()
    }, [])

    const removeProjectNoArgs = () => {
        setCurrentProject(undefined);
        setProjectData(undefined)
        removeProject(projectMetadata);
    }

  return (
    <>
        <header>
            <div className="m-2">
                <ProjectMetadata projectMetadata={projectMetadata}></ProjectMetadata>
            </div>
        </header>

        <div className="m-2">
            <ProjectData projectData={projectData}></ProjectData>
        </div>
        
        <footer className="fixed-bottom border bg-dark">
            <div className="m-2">
                <ActionButtons fetchProjectData={fetchProjectData} setCurrentProject={setCurrentProject} removeProject={removeProjectNoArgs}></ActionButtons>
            </div>
        </footer>
    </>
    
  )
}

export default Project

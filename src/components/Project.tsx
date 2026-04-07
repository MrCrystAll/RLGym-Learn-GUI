import { useEffect, useState } from "react"
import ActionButtons from "./project/ActionButtons"
import ProjectMetadata from "./project/ProjectMetadata"
import axios, { type AxiosResponse } from "axios";
import ProjectData from "./project/ProjectData";
import { BASE_URL } from "../api";

function Project({checkAPIStatus, projectMetadata, updateProject, setCurrentProject, removeProject, startProjectEntrypoint}) {

    const [projectData, setProjectData] = useState();
    const [loggerActive, setLoggerActive] = useState(false);

    const fetchProjectData = async () => {

        checkAPIStatus();

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

    const updateProjectName = async (name: string) => {
        checkAPIStatus();

        axios({
            method: "PUT",
            baseURL: `${BASE_URL}/project`,
            headers: {},
            data: {
                metadata: {
                    ...projectMetadata,
                    name: name
                }
            }
        }).then(
            () => {
                updateProject({
                    ...projectMetadata,
                    name: name
                })
            }
        )
    }

    const updatePythonInterpreter = async (path: string) => {
        checkAPIStatus();

        axios({
            method: "PUT",
            baseURL: `${BASE_URL}/project/interpreter`,
            headers: {},
            data: {
                metadata: projectMetadata,
                python_path: path
            }
        }).then(
            () => {
                setProjectData({
                    ...projectData,
                    interpreter: path
                })
            }
        )
    }

    const removeProjectNoArgs = () => {
        setCurrentProject(undefined);
        setProjectData(undefined)
        removeProject(projectMetadata);
    }

    const startRun = () => {
        setLoggerActive(true);
        startProjectEntrypoint(projectMetadata, () => setLoggerActive(false));
    }

  return (
    <>
        <header>
            <div className="m-2">
                <ProjectMetadata updateProjectName={updateProjectName} projectMetadata={projectMetadata}></ProjectMetadata>
            </div>
        </header>

        <div className="m-2 mb-5">
            <ProjectData updatePythonInterpreter={updatePythonInterpreter} loggerActive={loggerActive} projectData={projectData}></ProjectData>
        </div>
        
        <footer className="fixed-bottom border bg-dark">
            <div className="m-2">
                <ActionButtons startEntrypoint={startRun} fetchProjectData={fetchProjectData} setCurrentProject={setCurrentProject} removeProject={removeProjectNoArgs}></ActionButtons>
            </div>
        </footer>
    </>
    
  )
}

export default Project

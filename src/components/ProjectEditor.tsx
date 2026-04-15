import { useEffect, useState } from "react"
import ActionButtons from "./project/ActionButtons"
import ProjectMetadataEditor from "./project/ProjectMetadataEditor"
import axios, { type AxiosResponse } from "axios";
import ProjectDataEditor from "./project/ProjectDataEditor";
import { BASE_URL } from "../api";
import { type ProjectData, type ProjectMetadata } from "../models/project";
import type { LearningCoordinatorConfigModel } from "../models/rlgym-learn/api";

interface ProjectEditorArgs{
    checkAPIStatus: () => void
    projectMetadata: ProjectMetadata,
    updateProjectMetadata: (metadata: ProjectMetadata) => void,
    setCurrentProject: (project: ProjectMetadata | undefined) => void,
    removeProject: (metadata: ProjectMetadata) => void,
    startProjectEntrypoint: (metadata: ProjectMetadata, callback: () => void) => void;
}

function ProjectEditor({checkAPIStatus, projectMetadata, updateProjectMetadata, setCurrentProject, removeProject, startProjectEntrypoint}: ProjectEditorArgs) {

    const [projectData, setProjectData] = useState<ProjectData>();
    const [projectConfig, setProjectConfig] = useState<LearningCoordinatorConfigModel>();
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
            (response: AxiosResponse) => {setProjectData(response.data.project_data); setProjectConfig(response.data.config)}
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
                updateProjectMetadata({
                    ...projectMetadata,
                    name: name
                })
            }
        )
    }

    const updateProjectConfig = async(config: LearningCoordinatorConfigModel) => {
        setProjectConfig(config)
        checkAPIStatus();

        axios({
            method: "PUT",
            baseURL: `${BASE_URL}/project/config`,
            headers: {},
            data: {
                metadata: projectMetadata,
                config: config
            }
        })
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
                    interpreter: path,
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

    const dataRender = () => {
        if(projectData !== undefined && projectConfig !== undefined){
            return <div className="p-2 mp-5">
            <ProjectDataEditor projectConfig={projectConfig} updateProjectConfig={updateProjectConfig} setProjectData={setProjectData} updatePythonInterpreter={updatePythonInterpreter} loggerActive={loggerActive} setLoggerActive={setLoggerActive} projectData={projectData}></ProjectDataEditor>
        </div>
        }
        else{
            return <p className="text-secondary">Waiting for project data...</p>
        }
    }

  return (
    <div className="bg-dark text-light">
        <header>
            <div className="pt-2">
                <ProjectMetadataEditor updateProjectName={updateProjectName} projectMetadata={projectMetadata}></ProjectMetadataEditor>
            </div>
        </header>

        <hr className="border border-light mx-5"/>

        {dataRender()}
        
        <footer className="border border-dark bg-dark">
            <div className="m-2">
                <ActionButtons startEntrypoint={startRun} fetchProjectData={fetchProjectData} setCurrentProject={setCurrentProject} removeProject={removeProjectNoArgs}></ActionButtons>
            </div>
        </footer>
    </div>
    
  )
}

export default ProjectEditor

import ActionButtons from "./project/ActionButtons"
import ProjectMetadataEditor from "./project/ProjectMetadataEditor"
import projectService from "../services/project.service";
import type { ProjectMetadata, ProjectNotFoundErrorModel, Run } from "rlgym-learn-client";
import { useState } from "react";
import RunPage from "./project/rlgym-learn/run-handling/RunPage";
import ChoosePythonPath from "./ChoosePythonPath";
import RunList from "./project/rlgym-learn/run-handling/RunList";
import { useNotifications } from "../hooks/useNotifications";

interface ProjectEditorArgs{
    projectMetadata: ProjectMetadata,
    updateProjectMetadata: (metadata: ProjectMetadata) => void,

    setCurrentProject: (project: string | null) => void,
    removeProject: (projectId: string) => void
}

function ProjectEditor({projectMetadata, updateProjectMetadata, setCurrentProject, removeProject}: ProjectEditorArgs) {
    const [selectedRun, setSelectedRun] = useState<Run | null>(null);
    const {pushNotification} = useNotifications();

    const updateProjectName = async (name: string) => {
        (await projectService.updateProjectName(projectMetadata.id, name)).map(
            () => {updateProjectMetadata({
                ...projectMetadata,
                name: name
            })}
        ).mapErr(
            (e) => {
                if(e.status === 404){
                    const err = e.response?.data as ProjectNotFoundErrorModel
                    pushNotification({
                        message: `${err.message} (${err.inner_message})`,
                        severity: "error",
                        title: "Failed to update project " + err.project_id
                    })
                }
            }
        )
    }

    const updateProjectInterpreter = async (path: string) => {
        (await projectService.updateProjectInterpreter(projectMetadata.id, path)).map(
            () => {updateProjectMetadata({
                ...projectMetadata,
                interpreter: path
            })}
        ).mapErr(
            (e) => {
                if(e.status === 404){
                    const err = e.response?.data as ProjectNotFoundErrorModel
                    pushNotification({
                        message: `${err.message} (${err.inner_message})`,
                        severity: "error",
                        title: "Failed to update project " + err.project_id
                    })
                }
            }
        )
    }

    const removeProjectNoArgs = () => {
        setCurrentProject(null);
        removeProject(projectMetadata.id);
    }

    const runDisplay = () => {
        if(selectedRun === null){
            return <RunList onSelectRun={setSelectedRun} projectId={projectMetadata.id}></RunList>
        }
        else{
            return <RunPage run={selectedRun} backToHome={() => setSelectedRun(null)}></RunPage>
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

            <div className="p-3">
                <div>

                    <div className="d-flex">
                        <p className="me-2">Current python interpreter: "{projectMetadata.interpreter}"</p>
                        <ChoosePythonPath setPythonPath={(path) => updateProjectInterpreter(path)}></ChoosePythonPath>
                    </div>

                    {runDisplay()}

                    <footer className="border border-dark bg-dark">
                        <div className="m-2">
                            <ActionButtons setCurrentProject={setCurrentProject} removeProject={removeProjectNoArgs}></ActionButtons>
                        </div>
                    </footer>
                    
                </div>
            </div>            
        </div>
    )
}

export default ProjectEditor

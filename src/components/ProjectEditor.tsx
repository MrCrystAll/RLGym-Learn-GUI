import ActionButtons from "./project/ActionButtons"
import ProjectMetadataEditor from "./project/ProjectMetadataEditor"
import projectService from "../services/project.service";
import type { ProjectMetadata, Run } from "rlgym-learn-client";
import { useState } from "react";
import RunPage from "./project/rlgym-learn/run-handling/RunPage";
import ChoosePythonPath from "./ChoosePythonPath";
import RunList from "./project/rlgym-learn/run-handling/RunList";

interface ProjectEditorArgs{
    projectMetadata: ProjectMetadata,
    updateProjectMetadata: (metadata: ProjectMetadata) => void,

    fetchProjectMetadata: () => void

    setCurrentProject: (project: string | null) => void,
    removeProject: (projectId: string) => void
}

function ProjectEditor({projectMetadata, updateProjectMetadata, setCurrentProject, removeProject}: ProjectEditorArgs) {
    const [selectedRun, setSelectedRun] = useState<Run | null>(null);

    const updateProjectName = async (name: string) => {
        projectService.updateProjectName(projectMetadata.id, name).then(
            () => {updateProjectMetadata({
                ...projectMetadata,
                name: name
            })}
        )
    }

    const updateProjectInterpreter = async (path: string) => {
        projectService.updateProjectInterpreter(projectMetadata.id, path).then(
            () => {updateProjectMetadata({
                ...projectMetadata,
                interpreter: path
            })}
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

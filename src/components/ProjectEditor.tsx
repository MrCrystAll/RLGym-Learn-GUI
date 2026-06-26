import ActionButtons from "./project/ActionButtons"
import ProjectMetadataEditor from "./project/ProjectMetadataEditor"
import type { ProjectMetadata, Run } from "rlgym-learn-client";
import { useState } from "react";
import RunPage from "./project/rlgym-learn/run-handling/RunPage";
import RunList from "./project/rlgym-learn/run-handling/RunList";
import { useProject } from "../hooks/useProject";
import VenvInterface from "./project/venv/VenvInterface";
import { openDialog } from "../api";

interface ProjectEditorArgs{
    project: ProjectMetadata,
    updateProjectList: (metadata: ProjectMetadata) => void,

    setCurrentProject: (project: string | null) => void,
    removeProject: (projectId: string) => void
}

function ProjectEditor({project, updateProjectList, setCurrentProject, removeProject}: ProjectEditorArgs) {
    const [selectedRun, setSelectedRun] = useState<Run | null>(null);

    const {updateProjectInterpreter, updateProjectName} = useProject({project, updateProjectList});
    

    const removeProjectNoArgs = () => {
        setCurrentProject(null);
        removeProject(project.id);
    }

    if(selectedRun === null){
        return (
            <div>
                <header>
                    <div className="pt-2">
                        <ProjectMetadataEditor updateProjectName={updateProjectName} projectMetadata={project}></ProjectMetadataEditor>
                    </div>
                </header>
                <hr className="border mx-5"/>

                <div className="p-3">
                    <div>
                        <p className="display-6">Project details</p>
                        <p>In a project, you can specify a python interpeter. By default, it uses the global python interpeter, but i recommend you make a virtual environment and select the python of this virtual environment. You can create a run below using the button, you will be prompted to give a name to the run, i recommend you use semantic versioning or vibe versioning.</p>
                        <div className="d-flex">
                            <p className="me-2 my-auto">Current python interpreter: "{project.interpreter}"</p>
                            <button className="btn btn-primary" onClick={() => {
                                openDialog().then(
                                    (path: string) => updateProjectInterpreter(path)
                                )
                            }}>
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                        </div>
                        <VenvInterface projectMetadata={project}></VenvInterface>

                        <RunList onSelectRun={setSelectedRun} projectId={project.id}></RunList>

                        <footer>
                            <div className="m-2">
                                <ActionButtons setCurrentProject={setCurrentProject} removeProject={removeProjectNoArgs}></ActionButtons>
                            </div>
                        </footer>
                        
                    </div>
                </div>            
            </div>
        )
    }
    return <div className="mt-3">
        <RunPage run={selectedRun} backToHome={() => setSelectedRun(null)}></RunPage>
    </div>

    
}

export default ProjectEditor

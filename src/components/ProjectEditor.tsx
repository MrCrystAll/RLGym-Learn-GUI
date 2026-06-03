import ActionButtons from "./project/ActionButtons"
import ProjectMetadataEditor from "./project/ProjectMetadataEditor"
import type { ProjectMetadata, Run } from "rlgym-learn-client";
import { useState } from "react";
import RunPage from "./project/rlgym-learn/run-handling/RunPage";
import ChoosePythonPath from "./ChoosePythonPath";
import RunList from "./project/rlgym-learn/run-handling/RunList";
import { useProject } from "../hooks/useProject";

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

    const runDisplay = () => {
        if(selectedRun === null){
            return <RunList onSelectRun={setSelectedRun} projectId={project.id}></RunList>
        }
        else{
            return <RunPage run={selectedRun} backToHome={() => setSelectedRun(null)}></RunPage>
        }
    }

    return (
        <div className="bg-dark text-light">
            <header>
                <div className="pt-2">
                    <ProjectMetadataEditor updateProjectName={updateProjectName} projectMetadata={project}></ProjectMetadataEditor>
                </div>
            </header>
            <hr className="border border-light mx-5"/>

            <div className="p-3">
                <div>

                    <div className="d-flex">
                        <p className="me-2">Current python interpreter: "{project.interpreter}"</p>
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

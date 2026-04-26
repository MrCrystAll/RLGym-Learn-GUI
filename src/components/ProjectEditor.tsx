import { useState } from "react"
import ActionButtons from "./project/ActionButtons"
import ProjectMetadataEditor from "./project/ProjectMetadataEditor"
import ProjectDataEditor from "./project/ProjectDataEditor";
import { PageType, type Page, type ProcessPageModel, type ProjectProcessData } from "../api";
import ProcessPage from "./project/rlgym-learn/process-handling/ProcessPage";
import projectService from "../services/project.service";
import { useProjectData } from "../hooks/useProjectData";
import type { ProjectMetadata } from "rlgym-learn-client";

interface ProjectEditorArgs{
    projectMetadata: ProjectMetadata,
    updateProjectMetadata: (metadata: ProjectMetadata) => void,

    fetchProjectMetadata: () => void

    setCurrentProject: (project: string | null) => void,
    removeProject: (projectId: string) => void,
    startProjectEntrypoint: (metadata: ProjectMetadata) => Promise<number>;
    stopProjectEntrypoint: (data: ProjectProcessData) => Promise<void>;
    processStates: Record<number, ProjectProcessData>
}

function ProjectEditor({projectMetadata, updateProjectMetadata, setCurrentProject, removeProject, fetchProjectMetadata, startProjectEntrypoint, stopProjectEntrypoint, processStates}: ProjectEditorArgs) {
    const {projectConfig, updateProjectConfig, updatePythonInterpreter} = useProjectData({projectMetadata, fetchProjectMetadata})

    const [pages, setPages] = useState<Page[]>([{
        type: PageType.CONFIGURATION,
        name: "Configuration"
    }])

    const [activePage, setActivePage] = useState<Page>(pages[0]);
    
    const removePage = (page: Page) => {
        const index = pages.indexOf(page);
        
        const pagesArr = [...pages]
        pagesArr.splice(index, 1);

        setActivePage(pages[0]);
        setPages(pagesArr);
    }

    const updateProjectName = async (name: string) => {
        projectService.updateProjectName(projectMetadata.id, name).then(
            () => {updateProjectMetadata({
                ...projectMetadata,
                name: name
            })}
        )
    }

    const removeProjectNoArgs = () => {
        setCurrentProject(null);
        removeProject(projectMetadata.id);
    }

    const startRun = () => {        
        startProjectEntrypoint(projectMetadata).then(
            (pid) => {                
                const page: ProcessPageModel = {
                    name: `Process ${pid}`,
                    projectProcessData: processStates[pid],
                    type: PageType.PROCESS
                }

                setPages([
                    ...pages, page
                ])
            }
        )
    }

    const dataRender = () => {
        if(projectConfig !== null){
            return <div className="p-2 mp-5">
            <ProjectDataEditor projectMetadata={projectMetadata} projectConfig={projectConfig} updateProjectConfig={updateProjectConfig} updatePythonInterpreter={updatePythonInterpreter}></ProjectDataEditor>
        </div>
        }
        else{
            return <p className="text-secondary">Waiting for project data...</p>
        }
    }

    const content = () => {
        if(activePage.type === PageType.CONFIGURATION){
            return (
                <div>
                    {dataRender()}
                    
                    <footer className="border border-dark bg-dark">
                        <div className="m-2">
                            <ActionButtons startEntrypoint={startRun} setCurrentProject={setCurrentProject} removeProject={removeProjectNoArgs}></ActionButtons>
                        </div>
                    </footer>
                </div>
                
            )
        }
        else if(activePage.type === PageType.PROCESS){
            return <ProcessPage removePage={() => removePage(activePage)}  processState={(activePage as ProcessPageModel).projectProcessData} stopProcess={() => stopProjectEntrypoint((activePage as ProcessPageModel).projectProcessData)}></ProcessPage>
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
            <div className="d-flex">
                {pages.map((value: Page, index: number) => {
                    return <div style={{cursor: "pointer"}} className="d-flex justify-content-center border w-100" onClick={() => setActivePage(value)} key={index}>
                        <p className="display-6">{value.name}</p>
                    </div>
                })}
            </div>
            {content()}
        </div>
    )
}

export default ProjectEditor

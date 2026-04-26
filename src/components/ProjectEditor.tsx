import { useState } from "react"
import ActionButtons from "./project/ActionButtons"
import ProjectMetadataEditor from "./project/ProjectMetadataEditor"
import ProjectDataEditor from "./project/ProjectDataEditor";
import { PageType, type Page, type ProcessPageModel, type ProjectProcessData, type RunPageModel } from "../api";
import ProcessPage from "./project/rlgym-learn/process-handling/ProcessPage";
import projectService from "../services/project.service";
import { useProjectData } from "../hooks/useProjectData";
import type { ProjectMetadata } from "rlgym-learn-client";
import { useRuns } from "../hooks/useRuns";
import RunPage from "./project/rlgym-learn/run-handling/RunPage";

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
    const {runs, fetchingRuns, createRun} = useRuns(projectMetadata.id);

    const [pages, setPages] = useState<Page[]>([{
        type: PageType.MAIN,
        name: "Home"
    }, {
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

    const dataRender = () => {
        if(projectConfig !== null){
            return <div className="p-2 mp-5">
            <ProjectDataEditor backToHome={() => setActivePage(pages[0])} projectMetadata={projectMetadata} projectConfig={projectConfig} updateProjectConfig={updateProjectConfig} updatePythonInterpreter={updatePythonInterpreter}></ProjectDataEditor>
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
                </div>
                
            )
        }
        else if(activePage.type === PageType.PROCESS){
            return <ProcessPage removePage={() => removePage(activePage)}  processState={(activePage as ProcessPageModel).projectProcessData} stopProcess={() => stopProjectEntrypoint((activePage as ProcessPageModel).projectProcessData)}></ProcessPage>
        }
        else if(activePage.type === PageType.MAIN){
            return <div>
                <p>See configuration: <button className="btn btn-primary" onClick={() => setActivePage(pages[1])}>Configuration</button> </p>

                <p>Available runs</p>

                <button className="mb-3 btn btn-success">TODO: Add a run</button>

                <p className="text-secondary" hidden={!fetchingRuns}>Fetching runs...</p>
                <ul hidden={fetchingRuns}>
                    {runs.map(
                        (value, index) => <li key={index}>{value.name} <button className="ms-3 btn btn-outline-light" onClick={() => setActivePage({
                            type: PageType.RUN, name: value.name, run: value
                        })}>Go to run details</button></li>
                    )}
                </ul>
            </div>
        }
        else if(activePage.type === PageType.RUN){
            return <RunPage backToHome={() => setActivePage(pages[0])} run={(activePage as RunPageModel).run}></RunPage>
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
                {content()}

                <footer className="border border-dark bg-dark">
                    <div className="m-2">
                        <ActionButtons setCurrentProject={setCurrentProject} removeProject={removeProjectNoArgs}></ActionButtons>
                    </div>
                </footer>
            </div>

            
            
        </div>
    )
}

export default ProjectEditor

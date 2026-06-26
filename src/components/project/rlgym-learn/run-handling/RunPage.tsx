import type { Run, Session } from "rlgym-learn-client"
import { useRunData } from "../../../../hooks/useRunData";
import { useState } from "react";
import { PageType } from "../../../../api"
import ProjectDataEditor from "../../ProjectDataEditor";
import SessionList from "../process-handling/SessionList";
import ProcessPage from "../process-handling/ProcessPage";

interface RunPageArgs{
    run: Run

    backToHome: () => void
}

function RunPage({run, backToHome}: RunPageArgs){
    const {runConfig, updateRunConfig, getDefaultConfig} = useRunData({run: run})
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [mode, setMode] = useState(PageType.MAIN);

    const dataRender = () => {
        if(runConfig !== undefined){
            return <div>
                <ProjectDataEditor getDefaultConfig={getDefaultConfig} backToHome={() => setMode(PageType.MAIN)} projectConfig={runConfig} updateProjectConfig={updateRunConfig}></ProjectDataEditor>
            </div>
        }
        else{
            return <p className="text-secondary">Waiting for project data...</p>
        }
    }

    const sessionsDisplay = () => {
        if(selectedSession === null) return <SessionList run={run} onSelectSession={setSelectedSession}></SessionList>
        else return <ProcessPage session={selectedSession} backToRunPage={() => {setMode(PageType.MAIN); setSelectedSession(null)}}></ProcessPage>
    }


    const content = () => {
        if(mode === PageType.CONFIGURATION){
            return (
                <div>
                    {dataRender()}
                </div>
                
            )
        }
        else if(mode === PageType.MAIN){
            return <div>
                <p className="display-3">Run {run.name}</p>
                <hr></hr>
                <p>See configuration: <button className="btn btn-primary" onClick={() => setMode(PageType.CONFIGURATION)}>Configuration</button> </p>     

                <hr className="border mx-2"/>


                {sessionsDisplay()}
            </div>
        }
    }

    
    return (
        <div>
            <button className="btn btn-success" onClick={backToHome}>Back to project main</button>
            <div className="mt-2">
                {content()}
            </div>            
        </div>
    )
}

export default RunPage
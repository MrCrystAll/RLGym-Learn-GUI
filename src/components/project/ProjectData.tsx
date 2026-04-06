import { useEffect, useState } from "react";
import LogReader from "./LogReader"

const MAX_LINES: number = 15;

function ProjectData({projectData, loggerActive}) {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        window.api.removeAllListeners();
        // Only update logs if there aren't any already
        if(projectData !== undefined && lines.length == 0){
            window.api.readLogs(projectData.log_config.stdout_log);
            window.api.listenLines(setLines, MAX_LINES);
        }
        
    }, [projectData])

    useEffect(() => {
        return () => {            
            window.api.removeAllListeners();
        }
    }, [])

    const rewardFiles = () => {
        if(projectData.rewards_files.length > 0){
            return (
                <>
                    <p>Reward files:</p>
                    {projectData.rewards_files.map((file: string, index: number) => <p key={index}>{file}</p>)}
                </>
            )
        }
        else{
            return (
                <p>No reward files found</p>
            )
        }
    }
    
    const entrypoint = () => {
        if(projectData.entrypoint !== undefined)
        {
            return (
                <p><b>Entrypoint:</b> {projectData.entrypoint}</p>
            )
        }
        else{
            return (
                <p>No entrypoint found</p>
            )
        }
    }

    const clearLogs = () => {
        setLines([]);
    }

    const stdoutLog = () => {
        if(projectData.log_config.stdout_log !== undefined)
        {
            if(lines.length > 0 || loggerActive){
                return (
                    <>
                        <button className="btn btn-success" onClick={clearLogs}>Clear logs</button>
                        <LogReader maxLines={MAX_LINES} active={loggerActive} lines={lines} logPath={projectData.log_config.stdout_log}></LogReader>
                    </>
                )
            }
        }
        else{
            return (
                <p>No log file</p>
            )
        }
    }

    if(projectData === undefined){
        return (
            <p>No data found for this project</p>
        )
    }
    else{
        return (
            <div>
                <p>Python interpreter: {projectData.interpreter}</p>
                {rewardFiles()}
                {entrypoint()}
                {stdoutLog()}
            </div>
        )
    }

  
}

export default ProjectData

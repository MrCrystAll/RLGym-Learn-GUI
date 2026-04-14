import { useEffect, useState } from "react";
import LogReader from "./LogReader"
import ChoosePythonPath from "../ChoosePythonPath";
import LearningCoordinatorConfigEditor from "./rlgym-learn/LearningCoordinatorConfigEditor";
import type { LearningCoordinatorConfigModel } from "../../models/rlgym-learn/api";
import { DEFAULT_LEARNING_COORDINATOR_CONFIG } from "./rlgym-learn/default_config";

const MAX_LINES: number = 15;

function ProjectData({projectData, setProjectData, projectType, loggerActive, setLoggerActive, updatePythonInterpreter}) {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        // Only update logs if there aren't any already
        if(projectData !== undefined){            
            window.api.readLogs(projectData.log_config.stdout_log).then(
                (value) => setLines(value.slice(-MAX_LINES))
            )

            if(projectData.learningCoordinatorConfigModel === undefined){
                projectData.learningCoordinatorConfigModel = DEFAULT_LEARNING_COORDINATOR_CONFIG;
                console.log("Object is undefined, redefining to default");
                
            }
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
                        <p>Showing last {MAX_LINES} logs</p>
                        <div className="btn-group">
                            <button className="btn btn-success" onClick={clearLogs}>Clear logs</button>
                            <button className="btn btn-dark" onClick={() => setLoggerActive(true)} hidden={loggerActive}>Follow logs</button>
                        </div>
                        <LogReader maxLines={MAX_LINES} setLines={setLines} active={loggerActive} lines={lines} logPath={projectData.log_config.stdout_log}></LogReader>
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
    
    const updateLearningCoordinatorConfigModel = (config: LearningCoordinatorConfigModel) => {
        console.log(config);
              
        setProjectData({
            ...projectData,
            learningCoordinatorConfigModel: config
        })
    }

    if(projectData === undefined){
        return (
            <p>No data found for this project</p>
        )
    }
    else if(projectType == "rlgym-learn")
    {
        return (
                <LearningCoordinatorConfigEditor learningCoordinatorConfig={projectData.learningCoordinatorConfigModel} setLearningCoordinatorConfig={updateLearningCoordinatorConfigModel}/>
        )
    }
    else{
        return (
            <div className="bg-dark text-light">
                <div className="d-flex align-items-center">
                    <p>Python interpreter: {projectData.interpreter}</p>
                    <ChoosePythonPath setPythonPath={updatePythonInterpreter}></ChoosePythonPath>
                </div>
                {rewardFiles()}
                {entrypoint()}
                <hr className="border border-light mx-2"/>
                {stdoutLog()}
            </div>
        )
    }

  
}

export default ProjectData

import { useEffect, useState } from "react";
import LogReader from "./LogReader"
import ChoosePythonPath from "../ChoosePythonPath";
import LearningCoordinatorConfigEditor from "./rlgym-learn/LearningCoordinatorConfigEditor";
import type { LearningCoordinatorConfigModel } from "../../models/rlgym-learn/api";
import type { ProjectData } from "../../models/project";
import type { LineEntry } from "../../api";

const MAX_LINES: number = 15;

interface ProjectDataEditorArgs{
    projectData: ProjectData,
    setProjectData: (data: ProjectData) => void,

    loggerActive: boolean,
    setLoggerActive: (active: boolean) => void,

    updatePythonInterpreter: (path: string) => void,

    updateProjectConfig: (config: LearningCoordinatorConfigModel) => void
    projectConfig: LearningCoordinatorConfigModel
}

function ProjectDataEditor({projectData, setProjectData, loggerActive, setLoggerActive, updatePythonInterpreter, updateProjectConfig, projectConfig}: ProjectDataEditorArgs) {
    const [lines, setLines] = useState<LineEntry[]>([]);

    useEffect(() => {
        window.api.readLogs(projectData.log_config.stdout_log).then(
            (value: LineEntry[]) => setLines(value.slice(-MAX_LINES))
        )
        
    }, [projectData])

    useEffect(() => {
        return () => {                
            window.api.removeAllListeners();
        }
    }, [])
    
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
    
    const updateConfig = (config: LearningCoordinatorConfigModel) => {
        setProjectData({
            ...projectData,
            learningCoordinatorConfigModel: config
        });
        updateProjectConfig(config);
    }

    if(projectData === undefined){
        return (
            <p>No data found for this project</p>
        )
    }
    else{
        return (
            <div className="bg-dark text-light">
                <div className="d-flex align-items-center">
                    <p>Python interpreter: {projectData.interpreter}</p>
                    <ChoosePythonPath setPythonPath={updatePythonInterpreter}></ChoosePythonPath>
                </div>
                {entrypoint()}
                <LearningCoordinatorConfigEditor learningCoordinatorConfig={projectConfig} setLearningCoordinatorConfig={updateConfig}/>
                <hr className="border border-light mx-2"/>
                {stdoutLog()}
            </div>
        )
    }

  
}

export default ProjectDataEditor

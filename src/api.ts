import type { Run } from "rlgym-learn-client"
import type { LogConfig } from "./models/project"

export interface LineEntry{
    timestamp: string,
    line: string
}

export enum PageType{
    CONFIGURATION,
    PROCESS,
    MAIN,
    RUN
}

export interface Page{
    type: PageType,
    name: string
}

export enum ProcessState{
    SPAWNED,
    READY,
    ENDED
}

export interface ProjectProcessData{
    pid: number
    log_config: LogConfig
    state: ProcessState
}


export interface ProcessPageModel extends Page
{
    projectProcessData: ProjectProcessData,
}

export interface RunPageModel extends Page
{
    run: Run
}
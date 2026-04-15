import type { LearningCoordinatorConfigModel } from "./rlgym-learn/api"

export type ProjectType = "rlgym-learn" | "unknown"

export interface LogConfig{
    stdout_log: string
}

export interface ProjectMetadata{
    name: string
    id: string
    path: string | undefined
    type: ProjectType
}

export interface ProjectData{
    rewards_files: string[],
    learningCoordinatorConfigModel: LearningCoordinatorConfigModel,
    log_config: LogConfig
    interpreter: string,
    entrypoint: string
}

export interface Project{
    metadata: ProjectMetadata
    data: ProjectData
    
}
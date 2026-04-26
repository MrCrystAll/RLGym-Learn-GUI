import type { LearningCoordinatorConfigModel } from "./rlgym-learn/api"

export interface LogConfig{
    stdout_log: string
    stderr_log: string
}

export interface ProjectMetadata{
    name: string
    id: string
    path: string | undefined
}

export interface ProjectData{
    rewards_files: string[],
    learningCoordinatorConfigModel: LearningCoordinatorConfigModel,
    interpreter: string,
    entrypoint: string,
    logs_folder: string
}

export interface Project{
    metadata: ProjectMetadata
    data: ProjectData
}
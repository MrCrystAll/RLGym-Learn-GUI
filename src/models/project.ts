export type ProjectType = "rlgym-learn" | "unknown"

export interface ProjectMetadata{
    name: string
    id: string
    path: string | undefined
    type: ProjectType
}

export interface ProjectData{
    reward_files: string[]
}

export interface Project{
    metadata: ProjectMetadata
    data: ProjectData
    
}
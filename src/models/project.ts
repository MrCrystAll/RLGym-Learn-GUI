export interface ProjectMetadata{
    name: string
    description?: string
    version: string
    id: string
    path: string | undefined
}

export interface ProjectData{
    reward_files: string[]
}

export interface Project{
    metadata: ProjectMetadata
    data: ProjectData
    
}
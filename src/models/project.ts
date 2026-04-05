export interface ProjectMetadata{
    name: string
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
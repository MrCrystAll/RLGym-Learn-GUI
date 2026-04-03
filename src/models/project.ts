export interface ProjectMetadata{
    name: string
    description?: string
    version: string
    id: string
}

export interface Project{
    metadata: ProjectMetadata

    reward_files: string[]
}
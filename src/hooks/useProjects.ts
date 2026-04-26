import { useEffect, useState } from "react";
import projectService from "../services/project.service";
import apiService from "../services/api.service";
import type { ProjectProcessData } from "../api";
import processService from "../services/process.service";
import type { ProjectCreationArgs, ProjectMetadata } from "rlgym-learn-client";

interface UseProjectsReturn{
    projects: Record<string, ProjectMetadata>
    currentProject: string | null
    projectFetchError: Error | null
    folderPath: string | null

    processStates: Record<number, ProjectProcessData>

    addProject: (args: ProjectCreationArgs) => Promise<void>
    updateProject: (metadata: ProjectMetadata) => void
    deleteProject: (projectId: string) => Promise<void>

    fetchProjects: () => Promise<void>
    updateProjectMetadata: () => void

    setCurrentProject: (path: string | null) => void;
    setFolder: (path: string) => Promise<void>;

    startProjectEntrypoint: (metadata: ProjectMetadata) => Promise<number>;
    stopProjectEntrypoint: (data: ProjectProcessData) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
    const [projects, setProjects] = useState<Record<string, ProjectMetadata>>({});
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const [folderPath, setFolderPath] = useState<string | null>(null);
    const [processStates, setProcessStates] = useState<Record<number, ProjectProcessData>>({});

    const [projectFetchError, setProjectFetchError] = useState<Error | null>(null);

    const setFolder = async (folderPath: string): Promise<void> => {
        await apiService.updateRootFolder(folderPath);
        setFolderPath(folderPath);
    }

    const updateProjectMetadata = async (): Promise<void> => {
        if(currentProject !== null){
            projectService.getProjectMetadata(currentProject).then(
                (value) => setProjects({
                    ...projects,
                    [value.id]: value
                })
            )
        }
    } 

    const fetchProjects = async (): Promise<void> => {
        apiService.getAllProjects().then(
            (fetchedProjects) => {
                
                const projectsObj: Record<string, ProjectMetadata> = {}

                fetchedProjects.forEach(
                    (project) => projectsObj[project.id] = project
                )

                setProjects(projectsObj);
                setProjectFetchError(null);
            }
        ).catch(
            (error: Error) => setProjectFetchError(error)
        )
    }
    useEffect(() => {
        fetchProjects();
    }, [folderPath])

    const addProject = async (args: ProjectCreationArgs): Promise<void> => {
        apiService.createProject(args).then(
            (_) => fetchProjects()
        );
    }

    const updateProject = (metadata: ProjectMetadata): void => {
        const filteredList = {...projects}
        filteredList[metadata.id] = metadata;
        
        setProjects(filteredList)

        if(metadata.id == currentProject)
        {
            setCurrentProject(metadata.id);
        }
    }

    const deleteProject = async (projectId: string): Promise<void> => {
        projectService.deleteProject(projectId).then(
            () => fetchProjects()
        );
    }

    const startProjectEntrypoint = async (metadata: ProjectMetadata): Promise<number> => {
        return await processService.startProjectEntrypoint(metadata).then(
            (processData) => {
                setProcessStates({
                    ...processStates,
                    [processData.pid]: processData
                });

                return processData.pid;
            }
        )
    }

    const stopProjectEntrypoint = async (processData: ProjectProcessData): Promise<void> => {
        processService.stopProjectEntrypoint(processData).then(
            (processData) => {
                setProcessStates({
                    ...processStates,
                    [processData.pid]: processData
                });
            }
        )
    }

    return {folderPath, projects, currentProject, projectFetchError, processStates, addProject, updateProjectMetadata, updateProject, deleteProject, setCurrentProject, fetchProjects, setFolder, startProjectEntrypoint, stopProjectEntrypoint}
}
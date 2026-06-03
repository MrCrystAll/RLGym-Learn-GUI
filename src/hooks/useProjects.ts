import { useState } from "react";
import projectService from "../services/project.service";
import apiService from "../services/api.service";
import type { ProjectCreationArgs, ProjectMetadata, RLGymLearnApiExceptionModel, ValidationError } from "rlgym-learn-client";
import { useNotifications } from "./useNotifications";

interface UseProjectsReturn{
    projects: Record<string, ProjectMetadata>
    currentProject: string | null
    folderPath: string | null

    addProject: (args: ProjectCreationArgs) => Promise<void>
    updateProject: (metadata: ProjectMetadata) => void
    deleteProject: (projectId: string) => Promise<void>

    fetchProjects: () => Promise<void>

    setCurrentProject: (path: string | null) => void;
    setFolder: (path: string) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
    const [projects, setProjects] = useState<Record<string, ProjectMetadata>>({});
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const [folderPath, setFolderPath] = useState<string | null>(null);
    const {pushNotification} = useNotifications();

    const setFolder = async (folderPath: string): Promise<void> => {
        await apiService.updateRootFolder(folderPath);
        setFolderPath(folderPath);
        fetchProjects();
    }

    const fetchProjects = async (): Promise<void> => {
        (await apiService.getAllProjects()).map(
            (fetchedProjects) => {
                
                const projectsObj: Record<string, ProjectMetadata> = {}

                fetchedProjects.forEach(
                    (project) => projectsObj[project.id] = project
                )

                setProjects(projectsObj);
            }
        ).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
                    severity: "error"
                })
            }
        )
    }

    const addProject = async (args: ProjectCreationArgs): Promise<void> => {
        (await apiService.createProject(args)).map(
            () => fetchProjects()
        ).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
                    severity: "error"
                })
            }
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
        (await projectService.deleteProject(projectId)).map(
            () => fetchProjects()
        ).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
                    severity: "error"
                })
            }
        );
    }

    return {folderPath, projects, currentProject, addProject, updateProject, deleteProject, setCurrentProject, fetchProjects, setFolder}
}
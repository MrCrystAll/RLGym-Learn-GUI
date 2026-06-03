import { useEffect, useState } from "react";
import projectService from "../services/project.service";
import apiService from "../services/api.service";
import type { ProjectCreationArgs, ProjectMetadata, RLGymLearnApiExceptionModel } from "rlgym-learn-client";
import { useNotifications } from "./useNotifications";

interface UseProjectsArgs{
    folderPath: string | null
}

interface UseProjectsReturn{
    projects: Record<string, ProjectMetadata>
    currentProject: string | null

    addProject: (args: ProjectCreationArgs) => Promise<void>
    updateProject: (metadata: ProjectMetadata) => void
    deleteProject: (projectId: string) => Promise<void>

    fetchProjects: () => Promise<void>

    setCurrentProject: (path: string | null) => void;
}

export function useProjects({folderPath}: UseProjectsArgs): UseProjectsReturn {
    const [projects, setProjects] = useState<Record<string, ProjectMetadata>>({});
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const {pushNotification} = useNotifications();

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

    useEffect(() => {
        if(folderPath !== null) fetchProjects();
    }, [folderPath])

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
    return {projects, currentProject, addProject, updateProject, deleteProject, setCurrentProject, fetchProjects}
}
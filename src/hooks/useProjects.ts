import { useState } from "react";
import projectService from "../services/project.service";
import apiService from "../services/api.service";
import type { ProjectCreationArgs, ProjectCreationFailedModel, ProjectMetadata, ProjectNotFoundErrorModel, ProjectRootFolderNotFoundModel, ValidationError } from "rlgym-learn-client";
import type { AppNotification } from "./useNotifications";

interface UseProjectsArgs{
    pushError: (error: Omit<AppNotification, "id">) => void
}

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

export function useProjects({pushError}: UseProjectsArgs): UseProjectsReturn {
    const [projects, setProjects] = useState<Record<string, ProjectMetadata>>({});
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const [folderPath, setFolderPath] = useState<string | null>(null);

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
            (err) => {
                if(err.status === 404) pushError(
                    {
                        message: (err.response?.data as ProjectRootFolderNotFoundModel).message,
                        severity: "error",
                        title: "Fetch all project error"
                    }
                )
                else pushError(
                    {
                        message: (err.response?.data as ValidationError).msg,
                        severity: "error",
                        title: "Fetch all project error"
                    }
                )
            }
        )
    }

    const addProject = async (args: ProjectCreationArgs): Promise<void> => {
        (await apiService.createProject(args)).map(
            () => fetchProjects()
        ).mapErr(
            (e) => {
                if(e.status === 404 || e.status === 417) {
                    const err = e.response?.data as ProjectCreationFailedModel;
                    pushError({
                        message: err.message + " (" + err.inner_exception_message + ")",
                        severity: "error",
                        title: `Project "${err.name}" failed to create`
                    })
                }
                else{
                    const err = e.response?.data as ValidationError;
                    pushError({
                        message: err.msg,
                        severity: "error",
                        title: "Validation error on project creation"
                    })
                }
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
                if(e.status === 404) {
                    const err = e.response?.data as ProjectNotFoundErrorModel
                    pushError({
                        message: `${err.message} (${err.inner_message})`,
                        severity: "error",
                        title: `Project "${err.project_id}" failed to delete`,
                        duration: 10_000
                    })
                }
                else{
                    const err = e.response?.data as ValidationError
                    pushError({
                        message: err.msg,
                        severity: "error",
                        title: "Validation error during project deletion"
                    })
                }
            }
        );
    }

    return {folderPath, projects, currentProject, addProject, updateProject, deleteProject, setCurrentProject, fetchProjects, setFolder}
}
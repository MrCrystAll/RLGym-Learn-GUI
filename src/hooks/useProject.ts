import type { ProjectMetadata, RLGymLearnApiExceptionModel } from "rlgym-learn-client";
import projectService from "../services/project.service";
import { useNotifications } from "./useNotifications";

interface UseProjectArgs{
    project: ProjectMetadata
    updateProjectList: (project: ProjectMetadata) => void
}

interface UseProjectReturn{
    updateProjectName: (name: string) => Promise<void>
    updateProjectInterpreter: (path: string) => Promise<void>
}

export function useProject({project, updateProjectList}: UseProjectArgs): UseProjectReturn {
    const {pushNotification} = useNotifications();

    const updateProjectName = async (name: string) => {
        (await projectService.updateProjectName(project.id, name)).map(
            () => {updateProjectList({
                ...project,
                name: name
            }); pushNotification({
                message: `Project name has successfully been updated to "${name}"`,
                severity: "success",
                title: "Project updated successfully"
            })}
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

    const updateProjectInterpreter = async (path: string) => {
        (await projectService.updateProjectInterpreter(project.id, path)).map(
            () => {updateProjectList({
                ...project,
                interpreter: path
            }); pushNotification({
                message: `Project interpreter has successfully been updated to "${path}"`,
                severity: "success",
                title: "Project updated successfully"
            })}
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

    return {updateProjectInterpreter, updateProjectName}
}
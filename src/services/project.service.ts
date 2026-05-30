import type { ProjectMetadata, ProjectNotFoundErrorModel, ValidationError } from "rlgym-learn-client";
import apiService from "./api.service";
import { err, ok, type Result } from "neverthrow";
import type { AxiosError } from "axios";

class ProjectService {
    
    // Getters (Unused for now)
    async getProjectMetadata(projectId: string): Promise<Result<ProjectMetadata, AxiosError<ProjectNotFoundErrorModel | ValidationError>>>{
        return apiService.projectApi.getProjectMetadata(projectId).then((r) => ok(r.data)).catch((e) => err(e))
    }
    
    // Updaters
    async updateProjectName(projectId: string, name: string): Promise<Result<void, AxiosError<ProjectNotFoundErrorModel | ValidationError>>>{
        return apiService.projectApi.updateProjectMetadata(projectId, {
            name: name
        }).then((r) => ok(r.data)).catch((e) => err(e));
    }

    async updateProjectInterpreter(projectId: string, path: string): Promise<Result<void, AxiosError<ProjectNotFoundErrorModel | ValidationError>>>{
        return apiService.projectApi.updateProjectMetadata(projectId, {
            interpreter: path
        }).then((r) => ok(r.data)).catch((e) => err(e));
    }

    // Deleters
    async deleteProject(projectId: string): Promise<Result<void, AxiosError<ProjectNotFoundErrorModel | ValidationError>>>{
        return apiService.projectApi.deleteProject(projectId).then((r) => ok(r.data)).catch((e) => err(e));
    }
}

export default new ProjectService();
import type { ProjectMetadata } from "rlgym-learn-client";
import apiService from "./api.service";

class ProjectService {
    
    // Getters
    async getProjectMetadata(projectId: string): Promise<ProjectMetadata>{
        return apiService.projectApi.getProjectMetadata(projectId).then((r) => r.data)
    }
    
    // Updaters
    async updateProjectName(projectId: string, name: string): Promise<void>{
        return apiService.projectApi.updateProjectMetadata(projectId, {
            name: name
        }).then((r) => r.data);
    }

    async updateProjectInterpreter(projectId: string, path: string): Promise<void>{
        return apiService.projectApi.updateProjectMetadata(projectId, {
            interpreter: path
        }).then((r) => r.data);
    }

    // Deleters
    async deleteProject(projectId: string): Promise<void>{
        return apiService.projectApi.deleteProject(projectId).then((r) => r.data);
    }
}

export default new ProjectService();
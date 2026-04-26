import type { ProjectProcessData } from "../api";
import type { ProjectMetadata } from "../models/project";
import apiService from "./api.service";

class ProcessService {
    // Actions
    async startProjectEntrypoint(metadata: ProjectMetadata): Promise<ProjectProcessData>{
        return apiService.post("/process/create", {metadata})
    }
    
    // Actions
    async stopProjectEntrypoint(processData: ProjectProcessData): Promise<ProjectProcessData>{
        return apiService.post("/process/stop", {process_data: processData})
    }
}

export default new ProcessService();
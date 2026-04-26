import type { Run } from "rlgym-learn-client";
import apiService from "./api.service";

class RunsService {
    // Actions
    async createRun(projectId: string, runName: string): Promise<string>{
        return apiService.runsApi.createRun({
            project_id: projectId,
            run_name: runName
        }).then((r) => r.data);
    }

    async deleteRun(projectId: string, runName: string): Promise<void>{
        return apiService.runsApi.deleteRun({
            project_id: projectId,
            run_name: runName
        }).then((r) => r.data);
    }

    async getAllRuns(projectId: string): Promise<Run[]>{
        return apiService.runsApi.getAllRuns(projectId).then((r) => r.data);
    }
}

export default new RunsService();
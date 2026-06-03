import type { PPOAgentControllerConfigModel, RLGymLearnApiExceptionModel, Run } from "rlgym-learn-client";
import apiService from "./api.service";
import type { LearningCoordinatorConfigModel } from "../models/rlgym-learn/api";
import { err, ok, Result } from "neverthrow";
import type { AxiosError } from "axios";

class RunsService {
    // Actions
    async createRun(projectId: string, runName: string): Promise<Result<string, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.runsApi.createRun({
            project_id: projectId,
            run_name: runName
        }).then((r) => ok(r.data)).catch((e) => err(e));
    }

    async deleteRun(projectId: string, runName: string): Promise<Result<void, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.runsApi.deleteRun({
            project_id: projectId,
            run_name: runName
        }).then((r) => ok(r.data)).catch((e) => err(e));
    }

    async getAllRuns(projectId: string): Promise<Result<Run[], AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.runsApi.getAllRuns(projectId).then((r) => ok(r.data)).catch((e) => err(e));
    }

    async updateRunConfig(projectId: string, runName: string, config: LearningCoordinatorConfigModel): Promise<Result<void, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.runsApi.updateRunConfig(projectId, runName, {data: config}).then((r) => ok(r.data)).catch((e) => err(e));
    }


    async getRunConfig(projectId: string, runName: string): Promise<Result<LearningCoordinatorConfigModel, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.runsApi.getRunData(projectId, runName).then((r) => ok(r.data)).catch((e) => err(e))
    }

    async getDefaultConfig(projectId: string, runName: string, configType: string): Promise<Result<PPOAgentControllerConfigModel, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.runsApi.getDefaultConfig(projectId, runName, configType).then((r) => ok(r.data)).catch((e) => err(e))
    }
}

export default new RunsService();
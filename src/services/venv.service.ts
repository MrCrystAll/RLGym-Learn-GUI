import { err, ok, Result } from "neverthrow";
import apiService from "./api.service";
import type { AxiosError } from "axios";
import type { PackageInfo, RLGymLearnApiExceptionModel, VenvConfig } from "rlgym-learn-client";

class VenvService {
    async createEnvironment(projectId: string, pythonExecutable: string): Promise<Result<VenvConfig, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.venvApi.createVenv({
            project_id: projectId,
            python_executable: pythonExecutable
        }).then((r) => ok(r.data)).catch((e) => err(e))
    }

    async deleteEnvironment(projectId: string): Promise<Result<string, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.venvApi.deleteVenv(projectId).then(
            (r) => ok(r.data)
        ).catch((r) => err(r))
    }

    async getPackages(projectId: string): Promise<Result<Record<string, PackageInfo>, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.venvApi.listPackages(projectId).then(
            (r) => ok(r.data)
        ).catch((r) => err(r))
    }
}

export default new VenvService();
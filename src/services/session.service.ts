import type { RLGymLearnApiExceptionModel, Session } from "rlgym-learn-client";
import apiService from "./api.service";
import { err, ok, type Result } from "neverthrow";
import type { AxiosError } from "axios";

class SessionService {
    async startSession(projectId: string, runName: string): Promise<Result<Session, AxiosError<RLGymLearnApiExceptionModel>>>{
        const port = (window as any).electron?.apiPort ?? '8000';
        return apiService.sessionApi.startNewSession({
            project_id: projectId,
            run_name: runName,
            port: Number.parseInt(port)
        }).then((r) => ok(r.data)).catch((e) => err(e))
    }

    async stopSession(sessionId: string): Promise<Result<number, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.sessionApi.stopSession(sessionId).then((r) => ok(r.data)).catch((e) => err(e));
    }

    async getAllSessions(projectId: string, runName: string): Promise<Result<Session[], AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.sessionApi.getAllSessions({
            project_id: projectId,
            run_name: runName
        }).then((r) => ok(r.data)).catch((e) => err(e))
    }

    async getSessionHealth(session: Session): Promise<Result<string, AxiosError<RLGymLearnApiExceptionModel>>>{
        return apiService.sessionApi.getSessionHealth(session.session_id, {
            project_id: session.project_id,
            run_name: session.run_name
        }).then((r) => ok(r.data)).catch((e) => err(e))
    }
}

export default new SessionService();
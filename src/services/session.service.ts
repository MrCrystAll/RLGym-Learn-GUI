import type { Session } from "rlgym-learn-client";
import apiService from "./api.service";

class SessionService {
    async startSession(projectId: string, runName: string): Promise<Session>{
        return apiService.sessionApi.startNewSession({
            project_id: projectId,
            run_name: runName
        }).then((r) => r.data)
    }

    async stopSession(sessionId: string): Promise<void>{
        return apiService.sessionApi.stopSession(sessionId).then((r) => r.data);
    }

    async getAllSessions(projectId: string, runName: string): Promise<Session[]>{
        return apiService.sessionApi.getAllSessions({
            project_id: projectId,
            run_name: runName
        }).then((r) => r.data)
    }

    async getSessionHealth(session: Session): Promise<string>{
        return apiService.sessionApi.getSessionHealth(session.session_id, {
            project_id: session.project_id,
            run_name: session.run_name
        }).then((r) => r.data)
    }
}

export default new SessionService();
import { useEffect, useState } from "react";
import type { Run, Session } from "rlgym-learn-client";
import sessionService from "../services/session.service";

interface UseSessionsReturn{
    sessions: Session[],
    fetchingSession: boolean,

    startSession: () => Promise<Session>,
    stopSession: (sessionId: string) => void
}

export function useSessions(run: Run): UseSessionsReturn {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [fetchingSession, setFetchingSessions] = useState(false);

    useEffect(() => {
        getAllSessions();
    }, [run]);

    const getAllSessions = (): void => {
        setFetchingSessions(true);
        sessionService.getAllSessions(run.project_id, run.name).then(
            (data) => {setSessions(data); setFetchingSessions(false);}
        );
    }

    const startSession = async (): Promise<Session> => {
        return sessionService.startSession(run.project_id, run.name).then(
            (value) => {getAllSessions(); return value}
        );
    }

    const stopSession = async (sessionId: string): Promise<void> => {
        sessionService.stopSession(sessionId);
    }

    return {sessions, fetchingSession, startSession, stopSession}
}
import { useEffect, useRef, useState } from "react";
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
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const getAllSessions = () => {
        let ignore = false;
        if(sessions.length == 0) setFetchingSessions(true);
        sessionService.getAllSessions(run.project_id, run.name).then(
            (data) => {
                if(ignore) return;
                setSessions(data); setFetchingSessions(false);
            }
        );
        return () => {
            ignore = true;
        };
    }

    useEffect(() => {
        const cleanup = getAllSessions();

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(getAllSessions, 5000);

        return () => {
            cleanup();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [run]);

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
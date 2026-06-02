import { useEffect, useRef, useState } from "react";
import type { RLGymLearnApiExceptionModel, Run, Session } from "rlgym-learn-client";
import sessionService from "../services/session.service";
import { useNotifications } from "./useNotifications";

interface UseSessionsReturn{
    sessions: Session[],
    fetchingSession: boolean,

    startSession: () => Promise<Session>
}

export function useSessions(run: Run): UseSessionsReturn {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [fetchingSession, setFetchingSessions] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const {pushNotification} = useNotifications();

    const getAllSessions =  async () => {
        let ignore = false;
        if(sessions.length == 0) setFetchingSessions(true);
        (await sessionService.getAllSessions(run.project_id, run.name)).map(
            (data) => {
                if(ignore) return;
                setSessions(data); setFetchingSessions(false);
            }
        ).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel;
                pushNotification({
                    message: err.description,
                    title: err.title,
                    severity: "error"
                })
            }
        );
        return () => {
            ignore = true;
        };
    }

    useEffect(() => {
        const func = () => {
            let ignore = false;
            getAllSessions();
            return () => {
                ignore = true;
            };
        }
        const cleanup = func();

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(getAllSessions, 5000);

        return () => {
            cleanup();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [run]);

    const startSession = async (): Promise<Session> => {
        let session: Session | null = null; 
        (await sessionService.startSession(run.project_id, run.name)).map(
            (value) => {getAllSessions(); pushNotification({
                message: `Session ${value.session_id} started successfully`,
                title: "Session started",
                severity: "info"
            }); session = value;}
        ).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel;
                pushNotification({
                    message: err.description,
                    title: err.title,
                    severity: "error"
                })
            }
        );
        if(session === null) return Promise.reject();
        return Promise.resolve<Session>(session);
    }

    

    return {sessions, fetchingSession, startSession}
}
import type { RLGymLearnApiExceptionModel, Session } from "rlgym-learn-client"
import sessionService from "../services/session.service"
import { useEffect, useRef, useState } from "react"
import { useNotifications } from "./useNotifications";


interface UseSessionHealthReturn{
    sessionHealth: string
    stopSession: (sessionId: string) => void
}

export function useSessionHealth(session: Session): UseSessionHealthReturn {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [sessionHealth, setSessionHealth] = useState<string>(session.status);
    const {pushNotification} = useNotifications();
    
    const getSessionHealth = async () => {
        let ignore = false;
        
        if(sessionHealth === "crashed" || sessionHealth === "finished") return () => {
            ignore = true;
        }

        (await sessionService.getSessionHealth(session)).map(
            (health) => {
                if(ignore) return;
                setSessionHealth(health);
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
        )

        return () => {
            ignore = true;
        };
    }
    
    useEffect(() => {
        const func = () => {
            let ignore = false;
            getSessionHealth();
            return () => {
                ignore = true;
            };
        }
        const cleanup = func();

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(getSessionHealth, 5000);

        return () => {
            cleanup();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [session.session_id]);

    const stopSession = async (sessionId: string): Promise<void> => {
        (await sessionService.stopSession(sessionId)).map((returnCode) => pushNotification({
            message: `Session ${sessionId} stopped with code ${returnCode}`,
            severity: returnCode === 0 ? "success" : "warning",
            title: "Session stopped"
        })).mapErr(
            (e) => {
                console.log(e.response?.data);
                
                const err = e.response?.data as RLGymLearnApiExceptionModel;
                pushNotification({
                    message: err.description,
                    title: err.title,
                    severity: "error"
                })
            }
        );
    }

    return {sessionHealth, stopSession}
}
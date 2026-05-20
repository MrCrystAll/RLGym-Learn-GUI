import type { Session } from "rlgym-learn-client"
import sessionService from "../services/session.service"
import { useEffect, useRef, useState } from "react"


interface UseSessionHealthReturn{
    sessionHealth: string
}

export function useSessionHealth(session: Session): UseSessionHealthReturn {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [sessionHealth, setSessionHealth] = useState<string>(session.status);
    
    const getSessionHealth = () => {
        let ignore = false;
        
        if(sessionHealth === "crashed" || sessionHealth === "finished") return () => {
            ignore = true;
        }

        sessionService.getSessionHealth(session).then(
            (health) => {
                if(ignore) return;
                setSessionHealth(health);
            } 
        )

        return () => {
            ignore = true;
        };
    }
    
    useEffect(() => {
        const cleanup = getSessionHealth();

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(getSessionHealth, 5000);

        return () => {
            cleanup();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [session.session_id]);

    return {sessionHealth}
}
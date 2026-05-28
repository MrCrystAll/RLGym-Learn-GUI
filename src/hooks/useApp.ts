import { useEffect, useState } from "react";
import apiService from "../services/api.service";

interface UseAppReturn {
    isAPIReady: boolean | null
    error: Error | null;
    refreshingAPI: boolean
    startingAPI: boolean

    startApi: () => Promise<void>
    checkAPIConnection: () => Promise<void>
}

export function useApp(): UseAppReturn {
    const [error, setError] = useState<Error | null>(null);
    const [isAPIReady, setIsAPIReady] = useState<boolean>(true);
    const [refreshingAPI, setRefreshingAPI] = useState<boolean>(false);
    const [startingAPI, setStartingAPI] = useState<boolean>(true);

    const startApi = async (): Promise<void> => {
        apiService.startAPI().then(
            () => setStartingAPI(false)
        ).catch((reason: Error) => {
            if(reason.cause !== undefined && reason.cause !== "Repeat") setError(reason)
        }
        )
    }

    const checkAPIConnection = async (): Promise<void> => {
        setRefreshingAPI(true);
        apiService.checkApiStatus()
            .then(() => {setIsAPIReady(true); setRefreshingAPI(false)})
            .catch((error) => {
                setError(error);
                setIsAPIReady(false);
                setRefreshingAPI(false);
            })
    }

    useEffect(() => {
        startApi();
    }, []);

    return {startingAPI, isAPIReady, error, refreshingAPI, startApi, checkAPIConnection}
}
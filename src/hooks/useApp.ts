import { useEffect, useState } from "react";
import apiService from "../services/api.service";

interface UseAppReturn {
    error: Error | null;
    startingAPI: boolean
    isBugged: boolean

    startApi: () => Promise<void>
}

export function useApp(): UseAppReturn {
    const [error, setError] = useState<Error | null>(null);
    const [startingAPI, setStartingAPI] = useState<boolean>(true);
    const [isBugged, setIsBugged] = useState<boolean>(false);

    const startApi = async (): Promise<void> => {
        const result = await apiService.startAPI();

        if(!result.ok){

            if(result.cause === undefined){
                const err = new Error(result.message);
                err.cause = result.cause;                
                setError(err);
                setIsBugged(true);
            }
            
        }
        else{
            setStartingAPI(false)
        }
    }

    useEffect(() => {
        startApi();
    }, []);

    return {startingAPI, isBugged, error, startApi}
}
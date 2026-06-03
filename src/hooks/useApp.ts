import { useEffect, useState } from "react";
import apiService from "../services/api.service";

interface UseAppReturn {
    error: Error | null;
    startingAPI: boolean
    isBugged: boolean
    currentProject: string | null
    folderPath: string | null

    startApi: () => Promise<void>
    setCurrentProject: (project: string | null) => void
    setFolder: (folderPath: string) => void
}

export function useApp(): UseAppReturn {
    const [error, setError] = useState<Error | null>(null);
    const [startingAPI, setStartingAPI] = useState<boolean>(true);
    const [isBugged, setIsBugged] = useState<boolean>(false);
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const [folderPath, setFolderPath] = useState<string | null>(null);

    const setFolder = async (path: string): Promise<void> => {
        apiService.updateRootFolder(path).then(
            () => setFolderPath(path)
        )
    }

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

    return {startingAPI, isBugged, error, currentProject, folderPath, startApi, setCurrentProject, setFolder}
}
import { useEffect, useState } from "react";
import type { Run } from "rlgym-learn-client";
import runsService from "../services/runs.service";

interface UseRunsReturn{
    runs: Run[],
    fetchingRuns: boolean,

    createRun: (projectId: string, runName: string) => void
    deleteRun: (projectId: string, runName: string) => void
}

export function useRuns(projectId: string): UseRunsReturn {
    const [runs, setRuns] = useState<Run[]>([]);
    const [fetchingRuns, setFetchingRuns] = useState(false);

    useEffect(() => {
        getAllRuns();
    }, [projectId]);

    const getAllRuns = () => {
        setFetchingRuns(true);
        runsService.getAllRuns(projectId).then(
            (data) => {setRuns(data); setFetchingRuns(false);}
        )
    }

    const createRun = async (projectId: string, runName: string): Promise<void> => {
        runsService.createRun(projectId, runName).then(() => getAllRuns());
    }

    const deleteRun = async (projectId: string, runName: string): Promise<void> => {
        runsService.deleteRun(projectId, runName).then(() => getAllRuns());
    }
    
    return {runs, fetchingRuns, createRun, deleteRun}
}
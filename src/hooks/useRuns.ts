import { useEffect, useRef, useState } from "react";
import type { RLGymLearnApiExceptionModel, Run } from "rlgym-learn-client";
import runsService from "../services/runs.service";
import { useNotifications } from "./useNotifications";

interface UseRunsReturn{
    runs: Run[],
    fetchingRuns: boolean,

    createRun: (projectId: string, runName: string) => void
    deleteRun: (projectId: string, runName: string) => void
    
}

export function useRuns(projectId: string): UseRunsReturn {
    const [runs, setRuns] = useState<Run[]>([]);
    const [fetchingRuns, setFetchingRuns] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const {pushNotification} = useNotifications();

    const getAllRuns = async () => {
        let ignore = false;
        if(runs.length == 0) setFetchingRuns(true);
        (await runsService.getAllRuns(projectId)).map(
            (data) => {
                if(ignore) return;
                setRuns(data); setFetchingRuns(false);
            }
        ).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
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
            getAllRuns();
            return () => {
                ignore = true;
            };
        }
        const cleanup = func();

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(getAllRuns, 5000);

        return () => {
            cleanup();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [projectId]);

    const createRun = async (projectId: string, runName: string): Promise<void> => {
        (await runsService.createRun(projectId, runName)).map(() => {
            getAllRuns();
            pushNotification({
                message: `The run "${runName}" has successfully been created!`,
                severity: "success",
                title: `Run ${runName} successfully created`
            });
        }).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
                    severity: "error"
                })
            }
        );
    }

    const deleteRun = async (projectId: string, runName: string): Promise<void> => {
        (await runsService.deleteRun(projectId, runName)).map(() => {
            getAllRuns();
            pushNotification({
                message: `Run ${runName} has successfully been deleted!`,
                severity: "success",
                title: `Run ${runName} successfully deleted`
            })
        }).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
                    severity: "error"
                })
            }
        );
    }
    
    return {runs, fetchingRuns, createRun, deleteRun}
}
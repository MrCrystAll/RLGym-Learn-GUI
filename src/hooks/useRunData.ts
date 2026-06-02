
import type { PPOAgentControllerConfigModel, RLGymLearnApiExceptionModel, Run } from "rlgym-learn-client";
import type { LearningCoordinatorConfigModel } from "../models/rlgym-learn/api";
import runsService from "../services/runs.service";
import { useEffect, useState } from "react";
import { useNotifications } from "./useNotifications";

interface UseDataArgs{
    run: Run
}

interface UseRunDataReturn {
    updateRunConfig: (config: LearningCoordinatorConfigModel) => void
    getDefaultConfig: (configType: string) => Promise<PPOAgentControllerConfigModel>
    runConfig: LearningCoordinatorConfigModel | undefined
}

export function useRunData({run}: UseDataArgs): UseRunDataReturn {
    const [runConfig, setRunConfig] = useState<LearningCoordinatorConfigModel | undefined>();
    const {pushNotification} = useNotifications();

    const getRunConfig = async (): Promise<void> => {
        (await runsService.getRunConfig(run.project_id, run.name)).map((data) => setRunConfig(data)).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
                    severity: "error"
                })
            }
        )
    }

    useEffect(() => {
        getRunConfig()
    }, [])

    const updateRunConfig = async (config: LearningCoordinatorConfigModel): Promise<void> => {
        (await runsService.updateRunConfig(run.project_id, run.name, config)).map(() => {
            pushNotification({
                message: `The configuration of the run ${run.name} has been successfully updated`,
                severity: "success",
                title: "Config successfully updated"
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
        )
        setRunConfig(config);
    }

    const getDefaultConfig = async (configType: string): Promise<PPOAgentControllerConfigModel> => {
        let return_config: PPOAgentControllerConfigModel | null = null;
        (await runsService.getDefaultConfig(run.project_id, run.name, configType)).map((data) => return_config = data).mapErr(
            (e) => {
                const err = e.response?.data as RLGymLearnApiExceptionModel
                pushNotification({
                    title: err.title,
                    message: err.description,
                    severity: "error"
                })
            }
        )

        if(return_config === null) return Promise.reject();
        return Promise.resolve<PPOAgentControllerConfigModel>(return_config);
    }

    return {runConfig, updateRunConfig, getDefaultConfig}
}
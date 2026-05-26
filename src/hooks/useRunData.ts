
import type { PPOAgentControllerConfigModel, Run } from "rlgym-learn-client";
import type { LearningCoordinatorConfigModel } from "../models/rlgym-learn/api";
import runsService from "../services/runs.service";
import { useEffect, useState } from "react";

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

    const getRunConfig = async (): Promise<LearningCoordinatorConfigModel> => {
        return runsService.getRunConfig(run.project_id, run.name)
    }

    useEffect(() => {
        getRunConfig().then((config) => setRunConfig(config))
    }, [])

    const updateRunConfig = async (config: LearningCoordinatorConfigModel): Promise<void> => {
        runsService.updateRunConfig(run.project_id, run.name, config)
        setRunConfig(config);
    }

    const getDefaultConfig = async(configType: string): Promise<PPOAgentControllerConfigModel> => {
        return runsService.getDefaultConfig(run.project_id, run.name, configType)
    }

    return {runConfig, updateRunConfig, getDefaultConfig}
}
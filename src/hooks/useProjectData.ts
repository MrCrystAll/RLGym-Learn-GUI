import { useEffect, useState } from "react";
import projectService from "../services/project.service";
import type { LearningCoordinatorConfigModel } from "../models/rlgym-learn/api";
import type { ProjectMetadata } from "rlgym-learn-client";

interface UseProjectDataReturn{
    projectConfig: LearningCoordinatorConfigModel | null

    updateProjectConfig: (data: LearningCoordinatorConfigModel) => void

    fetchProjectConfig: () => void

    updatePythonInterpreter: (path: string) => Promise<void>
}

interface UseProjectDataArgs{
    projectMetadata: ProjectMetadata,
    fetchProjectMetadata: () => void
}

export function useProjectData({projectMetadata, fetchProjectMetadata}: UseProjectDataArgs): UseProjectDataReturn {
    const [projectConfig, setProjectConfig] = useState<LearningCoordinatorConfigModel | null>(null);

    const fetchProjectConfig = async(): Promise<void> => {
        projectService.getProjectConfig(projectMetadata.id).then(
            (config) => setProjectConfig(config)
        );
    }

    useEffect(() => {
        fetchProjectConfig();
    }, []);

    const updatePythonInterpreter = async (path: string): Promise<void> => {
        projectService.updateProjectInterpreter(
            projectMetadata.id,
            path
        ).then(() => fetchProjectMetadata())
    }

    const updateProjectConfig = async (config: LearningCoordinatorConfigModel): Promise<void> => {
        projectService.updateProjectConfig(
            projectMetadata.id, config
        ).then(() => setProjectConfig(config));
    }
    
    return {projectConfig, fetchProjectConfig, updateProjectConfig, updatePythonInterpreter}
}
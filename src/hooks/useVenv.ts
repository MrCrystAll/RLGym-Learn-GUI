import type { ProjectMetadata } from "rlgym-learn-client";
import venvService from "../services/venv.service";
import { useNotifications } from "./useNotifications";
import { useLoader } from "./useLoader";

interface UseVenvArgs{
    metadata: ProjectMetadata
    updatePythonInterpreter: (pythonExecutable: string | null) => void
}

interface UseVenvReturn{
    createVenv: (pythonExecutable: string) => Promise<void>
}

export function useVenv({metadata, updatePythonInterpreter}: UseVenvArgs): UseVenvReturn{
    const {pushNotification} = useNotifications();
    const {startWaiting, stopWaiting} = useLoader();

    const createVenv = async (pythonExecutable: string): Promise<void> => {
        startWaiting({
            name: "Creating virtual environment...",
            details: "This operation can take a while depending on your disk's speed"
        });
        (await venvService.createEnvironment(metadata.id, pythonExecutable)).map(
            (venvConfig) => {updatePythonInterpreter(venvConfig.python_executable); stopWaiting("Creating virtual environment..."); pushNotification({
                message: `The creation of a virtual environment for the project ${metadata.name} has been successfully done.`,
                title: "Virtual environment successfully created",
                severity: "success"
            })}
        ).mapErr(
            (e) => pushNotification({
                title: e.response?.data.title,
                message: e.response?.data.description,
                severity: "error"
            })
        )
        stopWaiting("Creating virtual environment...")
    }
    
    return {createVenv}
}
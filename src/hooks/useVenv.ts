import { type PackageInfo, type ProjectMetadata } from "rlgym-learn-client";
import venvService from "../services/venv.service";
import { useNotifications } from "./useNotifications";
import { useLoader } from "./useLoader";
import { useState } from "react";

interface UseVenvArgs{
    metadata: ProjectMetadata
    updatePythonInterpreter: (pythonExecutable: string | null) => void
}

interface UseVenvReturn{
    createVenv: (pythonExecutable: string) => Promise<void>
    deleteVenv: () => Promise<void>
    getPackages: () => Promise<void>
    installPackage: (packageName: string) => Promise<void>
    installRequirements: (reqPath: string) => Promise<void>

    uninstall: (packageName: string) => Promise<void>
    update: (packageName: string) => Promise<void>
    getPackagesToUpdate: () => Promise<void>
    getPythonDefaultExecutables: () => Promise<void>

    packages: Record<string, PackageInfo>;
    packagesToUpdate: Record<string, string>
    pythonDefaults: Record<string, string>
}

export function useVenv({metadata, updatePythonInterpreter}: UseVenvArgs): UseVenvReturn{
    const {pushNotification} = useNotifications();
    const {startWaiting, stopWaiting} = useLoader();
    const [packages, setPackages] = useState<Record<string, PackageInfo>>({});
    const [packagesToUpdate, setPackagesToUpdate] = useState<Record<string, string>>({});
    const [pythonDefaults, setPythonDefaults] = useState<Record<string, string>>({});

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

    const deleteVenv = async () => {
        if(metadata.interpreter === null) return;
        startWaiting({
            name: "Deleting virtual environment"
        });
        (await venvService.deleteEnvironment(metadata.id)).map(
            (s) => {stopWaiting("Deleting virtual environment"); pushNotification({
                title: "Virtual environement successfully deleted",
                message: s,
                severity: "success"
            }); updatePythonInterpreter(null)}
        ).mapErr(
            (err) => {
                pushNotification({
                    title: err.response?.data.title,
                    message: err.response?.data.description,
                    severity: "error"
                })
            }
        )
        stopWaiting("Deleting virtual environment...")
    }

    const installPackage = async (packageName: string) => {
        if(metadata.interpreter === null) return;
        startWaiting({
            name: `Installing ${packageName}...`,
            details: "This can take either a few seconds or several minutes depending on the package. Sit tight if you chose a big package like torch (or anything using torch)."
        });
        (await venvService.installPackage(metadata.id, packageName)).map(
            (s) => {
                pushNotification({
                    message: s,
                    title: "Package install successful",
                    severity: "success"
                })
            } 
        ).mapErr(
            (e) => {
                pushNotification({
                    message: e.response?.data.description,
                    title: e.response?.data.title,
                    severity: "error"
                })
            }
        )
        stopWaiting(`Installing ${packageName}...`)
    }

    const installRequirements = async (reqPath: string) => {
        if(metadata.interpreter === null) return;
        startWaiting({
            name: `Installing packages from ${reqPath}...`
        });
        (await venvService.installRequirements(metadata.id, reqPath)).map(
            async (s) => {
                await getPackages();
                pushNotification({
                    message: s,
                    title: "Requirements install successful",
                    severity: "success"
                })
            } 
        ).mapErr(
            (e) => {
                pushNotification({
                    message: e.response?.data.description,
                    title: e.response?.data.title,
                    severity: "error"
                })
            }
        )
        stopWaiting(`Installing packages from ${reqPath}...`)
    }

    const uninstall = async (packageName: string) => {
        if(metadata.interpreter === null) return;
        startWaiting({
            name: `Uninstalling ${packageName}...`
        });
        (await venvService.uninstall(metadata.id, packageName)).map(
            async (s) => {
                pushNotification({
                    message: s,
                    title: "Package uninstall successful",
                    severity: "success"
                })
            } 
        ).mapErr(
            (e) => {
                pushNotification({
                    message: e.response?.data.description,
                    title: e.response?.data.title,
                    severity: "error"
                })
            }
        )
        stopWaiting(`Uninstalling ${packageName}...`)
    }

    const getPackagesToUpdate = async () => {
        if(metadata.interpreter === null) return;
        startWaiting({
            name: "Getting packages to update from the environment..."
        });
        (await venvService.getPackageUpdateStatus(metadata.id)).map(
            (data) => {
                setPackagesToUpdate(data);
                pushNotification({
                    message: `Successfully managed to check the packages to update from the virtual environment`,
                    title: "Successfully checked packages",
                    severity: "success"
                });
            }
        ).mapErr(
            (r) => pushNotification({
                message: r.response?.data.description,
                title: r.response?.data.title,
                severity: "error"
            })
        )

        stopWaiting("Getting packages to update from the environment...")
    }

    const getPackages = async () => {
        if(metadata.interpreter === null) return;
        startWaiting({
            name: "Getting packages from venv..."
        });
        (await venvService.getPackages(metadata.id)).map(
            (data) => {
                setPackages(data);
                pushNotification({
                    message: `Successfully managed to fetch ${Object.keys(data).length} packages from the virtual environment`,
                    title: "Successfully fetched packages",
                    severity: "success"
                });
            }
        ).mapErr(
            (r) => pushNotification({
                message: r.response?.data.description,
                title: r.response?.data.title,
                severity: "error"
            })
        )

        stopWaiting("Getting packages from venv...")
    }

    const update = async (packageName: string) => {
        if(metadata.interpreter === null) return;
        startWaiting({
            name: `Updating ${packageName}...`
        });
        (await venvService.update(metadata.id, packageName)).map(
            async (s) => {
                pushNotification({
                    message: s,
                    title: "Package update successful",
                    severity: "success"
                })
            } 
        ).mapErr(
            (e) => {
                pushNotification({
                    message: e.response?.data.description,
                    title: e.response?.data.title,
                    severity: "error"
                })
            }
        )
        stopWaiting(`Updating ${packageName}...`)
    }
    const getPythonDefaultExecutables = async () => {
        startWaiting({
            name: `Fetching python executables on your computer...`
        });
        (await venvService.getPythonDefaultExecutables()).map(
            (data) => {
                setPythonDefaults(data);
                pushNotification({
                    message: `Fetched ${Object.keys(data).length} python executables`,
                    title: "Python executables successfully fetched",
                    severity: "success"
                })
            } 
        ).mapErr(
            (e) => {
                pushNotification({
                    message: e.response?.data.description,
                    title: e.response?.data.title,
                    severity: "error"
                })
            }
        )
        stopWaiting(`Fetching python executables on your computer...`)
    }

    return {createVenv, deleteVenv, getPackages, packages, installPackage, installRequirements, uninstall, getPackagesToUpdate, packagesToUpdate, update, getPythonDefaultExecutables, pythonDefaults}
}
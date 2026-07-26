import { useEffect, useState } from "react";
import VenvCreateInterface from "./VenvCreateInterface";
import type { ProjectMetadata } from "rlgym-learn-client";
import { openDialog } from "../../../api";
import VenvRLGymPackages from "./VenvRLGymPackages";
import FullPackageList from "./FullPackageList";
import { useVenv } from "../../../hooks/useVenv";
import { VenvDeleteConfirmationModal } from "./VenvDeleteConfirmation";

interface VenvInterfaceArgs{
    projectMetadata: ProjectMetadata,
    updateProjectExecutable: (pythonExecutable: string | null) => void
}

function VenvInterface({projectMetadata, updateProjectExecutable}: VenvInterfaceArgs) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleCreateClose = () => setIsCreateModalOpen(false);
    const handleCreateShow = () => setIsCreateModalOpen(true);

    const handlePackageClose = () => setIsPackageModalOpen(false);
    const handlePackageShow = () => setIsPackageModalOpen(true);

    const handleDeleteClose = () => setIsDeleteModalOpen(false);
    const handleDeleteShow = () => setIsDeleteModalOpen(true);

    const {createVenv, deleteVenv, getPackages, packages, installPackage, installRequirements, uninstall, packagesToUpdate, getPackagesToUpdate, update} = useVenv({metadata: projectMetadata, updatePythonInterpreter: updateProjectExecutable})

    const createVenvModal = (python_executable: string) => {
        createVenv(python_executable).then(
          () => handleCreateClose()
        );
        
    }

    const installAndRefresh = (name: string) => {
      installPackage(name).then(
        () => getPackages().then(() => 
          getPackagesToUpdate()
        )
      )
    }

    const uninstallAndRefresh = (name: string) => {
      uninstall(name).then(
        () => getPackages().then(() => 
          getPackagesToUpdate()
        )
      )
    }

    const updateAndRefresh = (name: string) => {
      update(name).then(
        () => getPackages().then(() => 
          getPackagesToUpdate()
        )
      )
    }

    const installReqAndRefresh = (reqPath: string) => {
      installRequirements(reqPath).then(
        () => getPackages().then(() => 
          getPackagesToUpdate()
        )
      )
    }

    useEffect(() => {
      getPackages().then(
        () => getPackagesToUpdate()
      )
      
    }, [projectMetadata.interpreter])

    if(projectMetadata.interpreter === null){
        return <div className="mb-2 rounded">
            <div>
                <VenvCreateInterface isOpen={isCreateModalOpen} handleClose={handleCreateClose} formSubmit={createVenvModal}></VenvCreateInterface>
            </div>
            <div>
                <div>
                <p className="display-6">No interpreter!</p>
                <p>This project has no interpreter. You can't run a project without an interpreter. </p>

                <p>You can choose to pick an arbitrary python executable or let the application handle the python end.</p>

                <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => openDialog().then(
                        (path) => updateProjectExecutable(path)
                    ).catch()}>

                    Pick a python executable <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn btn-primary" onClick={handleCreateShow}>

                        Let the application handle my python
                    </button>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className="mb-2">
          <VenvDeleteConfirmationModal isOpen={isDeleteModalOpen} deleteVenv={() => {
            deleteVenv().then(
              () => handleDeleteClose()
            )
            
          }} handleClose={handleDeleteClose}></VenvDeleteConfirmationModal>
            <FullPackageList packages={packages} handleClose={handlePackageClose} isOpen={isPackageModalOpen} updateStatus={packagesToUpdate} update={updateAndRefresh} installRequirements={installReqAndRefresh} uninstall={uninstallAndRefresh} install={installAndRefresh}></FullPackageList>
            <div className="d-flex gap-2">
                <p className="display-6">Python environment</p>
                <button className="btn btn-primary p-2 my-auto bi bi-folder" onClick={() => console.error("TODO: Open dialog to python executable.")
                }></button>
            </div>

            <p className="fw-bold">RLGym related packages</p>
            <VenvRLGymPackages packages={packages} install={installAndRefresh} updateStatus={packagesToUpdate} update={updateAndRefresh} uninstall={uninstallAndRefresh}></VenvRLGymPackages>

            <div className="btn-group mt-2">
                <button className="btn btn-outline-info" onClick={handlePackageShow}>Check packages</button>
                <button className="btn btn-outline-danger" onClick={handleDeleteShow}>Delete environment</button>
                <button className="btn btn-outline-secondary" onClick={() => updateProjectExecutable(null)}>Unlink environment</button>
            </div>
        </div>
    )
}

export default VenvInterface
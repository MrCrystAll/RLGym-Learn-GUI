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

    const handlePackageClose = () => setIsPackageModalOpen(false);
    const handlePackageShow = () => setIsPackageModalOpen(true);

    const handleDeleteClose = () => setIsDeleteModalOpen(false);
    const handleDeleteShow = () => setIsDeleteModalOpen(true);

    const {createVenv, deleteVenv, getPackages, packages, installPackage, installRequirements, uninstall, packagesToUpdate, getPackagesToUpdate, update, getPythonDefaultExecutables, pythonDefaults} = useVenv({metadata: projectMetadata, updatePythonInterpreter: updateProjectExecutable})

    const handleCreateShow = () => {getPythonDefaultExecutables().then(() => setIsCreateModalOpen(true))};

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
      if(!projectMetadata.advanced_config?.user_handled_venv){
        getPackages().then(
          () => getPackagesToUpdate()
        )
      }
      
      
    }, [projectMetadata.interpreter])

    const titleInterpreterButton = () =>
      <div className="d-flex gap-2">
        <p className="display-6">Python environment</p>
        <button className="btn btn-primary p-2 my-auto bi bi-folder" onClick={() => window.api.openPathDialog(false, ["exe"], "python", projectMetadata.interpreter)}></button>
      </div>

    if(projectMetadata.advanced_config?.user_handled_venv){
      if(projectMetadata.interpreter === null){
        return <div>
          <p className="display-6">No interpreter!</p>
          <p>This project has no interpreter. You can't run a project without an interpreter.</p>

          <button className="btn btn-primary" onClick={() => openDialog().then(
              (path) => updateProjectExecutable(path)
          ).catch()}>

          Pick a python executable <i className="bi bi-pencil-fill"></i>
          </button>
        </div>
      }
      else{
        return <div className="d-flex">
          {titleInterpreterButton()}
          <button className="btn btn-primary ms-2 p-2 my-auto" onClick={() => openDialog().then(
              (path) => updateProjectExecutable(path)
          ).catch()}><i className="bi bi-pencil-fill"></i>
          </button>
        </div>
      }
    }

    else{
      if(projectMetadata.interpreter === null){
        return <div className="mb-2 rounded">
            <div>
                <VenvCreateInterface getPythonDefaults={getPythonDefaultExecutables} pythonDefaults={pythonDefaults} isOpen={isCreateModalOpen} handleClose={handleCreateClose} formSubmit={createVenvModal}></VenvCreateInterface>
            </div>
            <div>
                <div>
                <p className="display-6">No interpreter!</p>
                <p>This project has no interpreter. You can't run a project without an interpreter.</p>

                <p>Please select an interpreter for the application to use.</p>

                    <button className="btn btn-primary" onClick={handleCreateShow}>
                        Choose an interpreter
                    </button>
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
            {titleInterpreterButton()}

            <p className="fw-bold">RLGym related packages</p>
            <VenvRLGymPackages packages={packages} install={installAndRefresh} updateStatus={packagesToUpdate} update={updateAndRefresh} uninstall={uninstallAndRefresh}></VenvRLGymPackages>

            <div className="btn-group mt-2">
                <button className="btn btn-outline-info" onClick={handlePackageShow}>Check packages</button>
                <button className="btn btn-outline-danger" onClick={handleDeleteShow}>Delete environment</button>
            </div>
        </div>
    )
    }

    
}

export default VenvInterface
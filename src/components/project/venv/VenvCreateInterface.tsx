import { useState } from "react"
import { CloseButton, Modal } from "react-bootstrap"
import { openDialog } from "../../../api"
import DefaultPythonInterpreters from "./DefaultPythonInstallation"

interface VenvCreateInterfaceArgs{
    isOpen: boolean

    handleClose: () => void
    formSubmit: (python_executable: string) => void
}

function VenvCreateInterface({isOpen, handleClose, formSubmit}: VenvCreateInterfaceArgs) {
    const [interpreterPath, setInterpreterPath] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
 
    return <Modal size="lg" contentClassName="border" show={isOpen} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Create a python environment</Modal.Title>
            <CloseButton onClick={handleClose}></CloseButton>
        </Modal.Header>
        <Modal.Body>
            <p>In order for the application to handle python. You need to provide a python executable, either along the default ones found on your computer or by giving your own.</p>
            <DefaultPythonInterpreters pythonInterpreter={interpreterPath} setPythonInterpreter={setInterpreterPath}></DefaultPythonInterpreters>
            <div className="d-flex mt-2">
                <div className="border rounded p-2 me-2">
                    <small className="text-break" style={{fontFamily: "monospace"}}>{interpreterPath === null ? "No interpreter selected" : interpreterPath}</small>
                </div>
                <button className="btn border" onClick={() => openDialog().then(
                        (path) => setInterpreterPath(path)
                    ).catch()}>
                    <i className="bi bi-pencil-fill"></i>
                </button>
            </div>
            
            <small className="text-danger">{error}</small>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-outline-success" onClick={() => {
                if(interpreterPath === null){
                    setError("You must specify an interpreter to create a virtual environment.");
                    return;
                }
                formSubmit(interpreterPath);
            }}>Create</button>
        </Modal.Footer>
    </Modal>
}

export default VenvCreateInterface
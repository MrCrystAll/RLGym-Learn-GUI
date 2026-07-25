import { CloseButton, Modal } from "react-bootstrap"

interface VenvDeleteConfirmationArgs{
    isOpen: boolean

    handleClose: () => void
    deleteVenv: () => void
}

export function VenvDeleteConfirmationModal({isOpen, handleClose, deleteVenv}: VenvDeleteConfirmationArgs){
    return <Modal show={isOpen}>
        <Modal.Header>
            <Modal.Title>Delete the virtual environment</Modal.Title>
            <CloseButton onClick={handleClose}></CloseButton>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete the virtual environment for this project ?</p>
        </Modal.Body>
        <Modal.Footer>
            <div className="btn-group">
                <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
                <button className="btn btn-danger" onClick={deleteVenv}>Delete</button>
            </div>
        </Modal.Footer>
    </Modal>
}
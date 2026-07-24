import { useState } from "react"
import { CloseButton, Modal } from "react-bootstrap"; 

interface AddProjectArgs{
  addProject: (name: string) => void
}

function AddProject({addProject}: AddProjectArgs) {
  const [nameError, setNameError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {setNameError(null); setShow(false);}
  const handleShow = () => setShow(true);

  const create = (formData: FormData) => {
    
    // Name validation
    const name: string | undefined = formData.get("projectName")?.toString();

    if(name === undefined || name.trim().length == 0 || name.trim().length > 25){
      setNameError("Name needs to have a value or be shorter than 25 characters");
      return;
    }

    setNameError(null);

    addProject(name.trim());
    handleClose();
  }

    return (
        <div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                  <Modal.Title>Create your own project</Modal.Title>
                  <CloseButton onClick={handleClose}></CloseButton>
              </Modal.Header>
              <Modal.Body>
                <form action={create}>
                    <div className="form-group">
                      <label htmlFor="pName">Project name</label>
                      <input type="text" name="projectName" className="form-control" id="pName" aria-describedby="pName-help" placeholder="My best project"/>
                      <small id="pName-help" className="form-text text-secondary">The name for your project</small>
                      <p className="form-text text-danger">{nameError}</p>
                    </div>

                    <div className="btn-group">
                      <button type="submit" className="btn btn-primary">Create project</button>
                      <button className="btn btn-outline-danger" type="reset" onClick={handleClose}>Cancel</button>
                    </div>
                  </form>
              </Modal.Body>
          </Modal>

        <button type="button" className="btn btn-primary" onClick={handleShow}>
          <i className="bi bi-plus"></i>
        </button>
        </div>
    )
}

export default AddProject

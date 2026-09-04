import { useEffect, useState } from "react"
import { CloseButton, Collapse, FormCheck, Modal } from "react-bootstrap"; 
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import type { AdvancedConfigModel, ProjectCreationArgs } from "rlgym-learn-client";

interface AddProjectArgs{
  addProject: (args: ProjectCreationArgs) => void
  getDefaultAdvancedConfig: () => Promise<AdvancedConfigModel>
}

function AddProject({addProject, getDefaultAdvancedConfig}: AddProjectArgs) {
  const [nameError, setNameError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const [advancedConfig, setAdvancedConfig] = useState<AdvancedConfigModel | null>(null);

  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const [hoverAdvancedOptions, setHoverAdvancedOptions] = useState(false);

  const handleClose = () => {setNameError(null); setAdvancedOptionsOpen(false); setShow(false);}
  const handleShow = () => {
    getDefaultAdvancedConfig().then(
      (v) => {setAdvancedConfig(v); setShow(true)}
    )
  }

  const create = (formData: FormData) => {
    
    // Name validation
    const name: string | undefined = formData.get("projectName")?.toString();

    const userHandledVenv: boolean = Boolean(formData.get("userHandledVenv")?.valueOf()).valueOf()

    const advancedOptions: AdvancedConfigModel = {
      user_handled_venv: userHandledVenv
    }

    setAdvancedConfig(advancedOptions);

    if(name === undefined || name.trim().length == 0 || name.trim().length > 25){
      setNameError("Name needs to have a value or be shorter than 25 characters");
      return;
    }

    setNameError(null);

    addProject({
      name: name.trim(),
      advanced_config: advancedOptions
    });
    handleClose();
  }

  if(advancedConfig === null) return <>
    <button type="button" className="btn btn-primary" onClick={handleShow}>
          <i className="bi bi-plus"></i>
        </button>
  </>

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

                    <div className="my-3">
                        <fieldset className="border-top border-bottom">
                          <legend className="float-none w-auto mx-3">
                            <span className="m-2">Advanced options (Optional)</span>
                            
                          </legend>
                          <p className="text-muted small">
                            These options are for your convenience, if you are a new user, i'd recommend you don't touch these. If you are an advanced user, you might want to tweak these in case the default options makes your job harder.
                          </p>
                          <div className="d-flex" style={{cursor: "pointer", opacity: hoverAdvancedOptions ? 0.8 : 1}} onMouseEnter={() => setHoverAdvancedOptions(true)} onMouseLeave={() => setHoverAdvancedOptions(false)} onClick={() => setAdvancedOptionsOpen(!advancedOptionsOpen)}>
                            <i className={"me-2 bi bi-" + (advancedOptionsOpen ? "caret-down" : "caret-right")}></i>
                            <p>See advanced options</p>
                          </div>
                              <Collapse className="pb-2" in={advancedOptionsOpen}>
                                <div>
                                <FormCheck>
                                  <FormCheckLabel>Handle the python environment on my own</FormCheckLabel>
                                  <FormCheckInput name="userHandledVenv" type="checkbox" defaultChecked={advancedConfig.user_handled_venv}></FormCheckInput>
                                </FormCheck>
                                <small className="text-secondary">Checking this means the application will NOT try to do anything with the virtual environment like installing, checking packages to update or other operations. Everything is for you to do.</small>
                                </div>
                              </Collapse>
                        </fieldset>
                      
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

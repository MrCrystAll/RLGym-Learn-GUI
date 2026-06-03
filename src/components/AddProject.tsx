import { useState } from "react"

interface AddProjectArgs{
  addProject: (name: string) => void
}

function AddProject({addProject}: AddProjectArgs) {
  const [creating, setCreating] = useState(false);

  const [nameError, setNameError] = useState("");

  const createProject = (name: string) => {
    setCreating(false);
    addProject(name);
  }

  const create = (formData: FormData) => {
    
    // Name validation
    const name: string | undefined = formData.get("projectName")?.toString();

    if(name === undefined || name.trim().length == 0 || name.trim().length > 25){
      setNameError("Name needs to have a value or be shorter than 25 characters");
      return;
    }

    setNameError("");

    createProject(name.trim())
  }

  if(creating){
    return (
      <div className="rounded p-3" style={{backgroundColor: "darkgray"}}>
        <form action={create}>
          <div className="form-group text-light">
            <label htmlFor="pName">Project name</label>
            <input type="text" name="projectName" className="form-control" id="pName" aria-describedby="pName-help" placeholder="My best project"/>
            <small id="pName-help" className="form-text text-muted">The name for your project</small>
            <p className="form-text text-danger">{nameError}</p>
          </div>


        <button type="submit" className="btn btn-primary">Create project</button>
        <button className="btn btn-secondary" onClick={() => setCreating(false)}>Cancel</button>
        </form>
        </div>
    )
  }
  else{
    return (

      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-light w-25" onClick={() => setCreating(true)}>
          Add project
          <i className="bi bi-file-plus ms-2"></i>
        </button>
      </div>
    )
  }
}

export default AddProject

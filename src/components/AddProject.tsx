import { useState } from "react"

function AddProject({addProject}) {
  const [creating, setCreating] = useState(false);

  const [nameError, setNameError] = useState("");

  const createProject = (name: string) => {
    setCreating(false);
    addProject(name);
  }

  const create = (formData) => {
    
    // Name validation
    const name: string | undefined = formData.get("projectName");

    if(name === undefined || name.trim().length == 0){
      setNameError("Name needs to have a value");
      return;
    }
    

    setNameError("");

    createProject(name)
  }

  if(creating){
    return (
      <div>
        <p>Create a project</p>
        <form action={create}>
          <div className="form-group">
          <label htmlFor="pName">Project name</label>
          <input type="text" name="projectName" className="form-control" id="pName" aria-describedby="pName-help"/>
          <small id="pName-help" className="form-text text-muted">The name for your project (does not need to be unique)</small>
          <p className="form-text text-danger">{nameError}</p>
        </div>

        <button type="submit" className="btn btn-primary">Create project</button>
        </form>
        </div>
    )
  }
  else{
    return (
      <button type="button" className="btn btn-primary" onClick={() => setCreating(!creating)}>Add project</button>
    )
  }
}

export default AddProject

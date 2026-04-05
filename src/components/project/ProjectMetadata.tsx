import { useState } from "react"

function ProjectMetadata({projectMetadata, updateProjectName}) {

  const [editingName, setEditingName] = useState(false);
  const [nameEditionError, setNameEditionError] = useState("");

  const applyNameEdit = (formData) => {
    const name: string = formData.get("projectEditedName")

    console.log(name);
    

    // Validate
    if(name === undefined){
      setNameEditionError("Please enter a value for edition");
      return;
    }

    if(name.trim().length == 0 || name.trim().length > 25)
    {
      setNameEditionError("Please enter a name between 0 and 25 characters long");
      return;
    }


    console.log(`Renaming to ${name.trim()}`);
    

    setNameEditionError("");
    updateProjectName(name.trim())
    setEditingName(false);
  }

  const name = () => {
    if(editingName){
      return (
        <>
        <form action={applyNameEdit}>
          <div className="form-group"> 
            <div className="d-flex">
              <input type="text" name="projectEditedName" defaultValue={projectMetadata.name} className="form-control" id="pName" aria-describedby="pName-help"></input>
              <button className="btn btn-success ms-2" type="submit">
                <i className="bt bi-check"></i>
              </button>
              <button className="btn btn-danger ms-2" onClick={() => setEditingName(false)}>
                <i className="bt bi-x"></i>
              </button>
            </div>
            <p id="pName-help" className="form-text text-danger">{nameEditionError}</p>
          </div>
        </form>
        </>
      )
    }
    else{
      return (
        <div className="d-flex align-items-center">
          <p className="display-6">{projectMetadata.name}</p>
          <button className="btn border ms-2" onClick={() => setEditingName(true)}>
            <i className="bi bi-pencil"></i>
          </button>
        </div>
      )
    }
  }

  return (
    <div className="d-flex flex-column">
        <div className="d-flex justify-content-center ">
          {name()}
        </div>
        <p className="d-flex justify-content-center fw-bold">{projectMetadata.path}</p>
        
        <hr className="border border-dark"/>
    </div>
  )
}

export default ProjectMetadata

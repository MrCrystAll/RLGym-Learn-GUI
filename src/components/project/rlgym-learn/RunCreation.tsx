import { useState } from "react"

interface RunCreationArgs{
  createRun: (runName: string) => void,
  existingRuns: string[]
}

function RunCreation({createRun, existingRuns}: RunCreationArgs) {
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const onSubmit = (data: FormData) => {
        const runName: string | undefined = data.get("runName")?.toString();

        if(runName === undefined){
            setError("Run name is required.")
            return;
        }

        const existsAlready = existingRuns.find((value) => runName === value) !== undefined;

        if(existsAlready){
            setError("Run " + runName + " already exists, please use another name.");
            return;
        }

        setError(null);
        createRun(runName);
        setEditMode(false);
    }
    
    if(editMode){
        return <form action={onSubmit} className="col-3">
            <div className="form-group">
                <label>Run name</label>
                <input className="form-control" type="text" defaultValue={existingRuns.length > 0 ? existingRuns[existingRuns.length - 1] : "v1.0.0"} name="runName"></input>
                <small className="text-danger">{error}</small>
            </div>

            <div className="btn-group">
                <button className="btn btn-primary" type="submit">Submit</button>
                <button className="btn btn-danger" onClick={() => {setEditMode(false); setError(null)}} type="button">Cancel</button>
            </div>
        </form>
    }

  return (
    <button className="btn btn-primary" onClick={() => setEditMode(true)}>Create run</button>
  )
}

export default RunCreation

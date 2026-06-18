import { useState } from "react"
import { CloseButton, Modal } from "react-bootstrap";

interface RunCreationArgs{
  createRun: (runName: string) => void,
  existingRuns: string[]
}

function RunCreation({createRun, existingRuns}: RunCreationArgs) {
    const [error, setError] = useState<string | null>(null);

    const [show, setShow] = useState(false);

    const handleClose = () => {setError(null); setShow(false);}
    const handleShow = () => setShow(true);

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
        handleClose();
    }

  return (
    <div>
        <Modal show={show} contentClassName="border bg-dark text-light">
            <Modal.Header>
                <Modal.Title>Create your run</Modal.Title>
                <CloseButton variant="white" onClick={handleClose}></CloseButton>
            </Modal.Header>
            <Modal.Body>
                <p>You must pick a new name for each run.</p>
                <form action={onSubmit}>
                    <div className="form-group">
                        <label>Run name</label>
                        <input className="form-control" type="text" defaultValue={existingRuns.length > 0 ? existingRuns[existingRuns.length - 1] : "v1.0.0"} name="runName"></input>
                        <small className="text-danger">{error}</small>
                    </div>

                    <div className="btn-group mt-3">
                        <button className="btn btn-primary" type="submit">Submit</button>
                        <button className="btn btn-danger" onClick={handleClose} type="button">Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
        <button className="btn btn-primary" onClick={handleShow}>Create run</button>
    </div>
  )
}

export default RunCreation

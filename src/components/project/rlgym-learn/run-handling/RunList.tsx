import type { Run } from "rlgym-learn-client";
import { useRuns } from "../../../../hooks/useRuns"

interface RunListArgs{
    projectId: string

    onSelectRun: (run: Run) => void
}

function RunList({projectId, onSelectRun}: RunListArgs) {
    const {runs, fetchingRuns, createRun, deleteRun} = useRuns(projectId);

    const runsCaption = () => {
        if(fetchingRuns){
            return <p className="text-secondary">Fetching runs...</p>
        }

        if(runs.length === 0){
            return <p>No runs found for this project</p>
        }

        return <p>All runs</p>
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => createRun(projectId, "v1.0.0")}>TODO: Add run</button>
            {runsCaption()}
            <ul>
                {
                    runs.map(
                        r => <li key={r.name} className="d-flex" style={{cursor: "pointer"}}>
                            <p onClick={() => onSelectRun(r)}>{r.name}</p>
                            <button className="btn btn-danger ms-3" onClick={() => deleteRun(projectId, r.name)}><i className="bi bi-x"></i></button>
                        </li>
                    )
                }
            </ul>
        </div>
        
    )
}

export default RunList
import LogReader from "./LogReader";
import { ProcessState, type ProjectProcessData } from "../../../../api";

interface ProcessPageArgs{
    processState: ProjectProcessData
    removePage: () => void

    stopProcess: () => void
}

function ProcessPage({processState, removePage}: ProcessPageArgs) {

    const stdoutLog = () => {
        return (
            <>
                <div>
                    <LogReader streamName="STDOUT" logPath={processState.log_config.stdout_log} pid={processState.pid}></LogReader>
                    <LogReader streamName="STDERR" logPath={processState.log_config.stderr_log} pid={processState.pid}></LogReader>
                </div>
            </>
        )
    }

    const icon = () => {
        switch (+processState.state) {
            case ProcessState.SPAWNED:
                return <i className="bi bi-circle"></i>
            case ProcessState.READY:
                return <i className="bi bi-arrow-repeat"></i>
            case ProcessState.ENDED:
                return <i className="bi bi-check-circle-fill"></i>
            default:
                break;
        }
    }

    const spanState = () => {
        switch (+processState.state) {
            case ProcessState.SPAWNED:
                return <span className="badge text-bg-warning rounded-pill">IDLE</span>
            case ProcessState.READY:
                return <span className="badge text-bg-primary rounded-pill">Running</span>
            case ProcessState.ENDED:
                return <span className="badge text-bg-success rounded-pill">Finished</span>
            default:
                break;
        }
    }

    return (
        <div className="mt-3">
            <div className="d-flex float-end">
                <div className="me-3">
                    {icon()}
                </div>
                {spanState()}
            </div>
            <p>Process {processState.pid}</p>

            <div className="btn-group">
                <button className="btn btn-danger" hidden={processState.state === ProcessState.ENDED} onClick={stop} disabled={stopping}>{stopping ? "Stopping..." : "Stop"}</button>
            </div>
            {stdoutLog()}
            <button className="btn btn-danger" onClick={removePage}>Remove page</button>
        </div>
    )
}

export default ProcessPage
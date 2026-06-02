import type { Session } from "rlgym-learn-client";
import LogReader from "./LogReader";
import sessionService from "../../../../services/session.service";
import { useSessionHealth } from "../../../../hooks/useSessionHealth";
import { useSessions } from "../../../../hooks/useSessions";

interface ProcessPageArgs{
    session: Session
    backToRunPage: () => void
}

function ProcessPage({session, backToRunPage}: ProcessPageArgs) {
    const {sessionHealth, stopSession} = useSessionHealth(session);

    const stdoutLog = () => {
        return (
            <>
                <div>
                    <LogReader streamName="STDOUT" logPath={session.logs.stdout} sessionId={session.session_id}></LogReader>
                    <LogReader streamName="STDERR" logPath={session.logs.stderr} sessionId={session.session_id}></LogReader>
                </div>
            </>
        )
    }

    return (
        <div className="mt-3">
            <button className="btn btn-success" onClick={backToRunPage}>Back to run page</button>
            <p>Session {session.session_id}</p>
            {stdoutLog()}
            <button className="btn btn-danger" hidden={sessionHealth === "crashed" || sessionHealth === "finished"} onClick={() => stopSession(session.session_id)}>Stop session</button>
        </div>
    )
}

export default ProcessPage
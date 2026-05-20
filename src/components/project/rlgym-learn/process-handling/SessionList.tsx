import type { Run, Session } from "rlgym-learn-client";
import { useSessions } from "../../../../hooks/useSessions";

interface SessionListArgs{
    run: Run

    onSelectSession: (session: Session) => void
}

function SessionList({run, onSelectSession}: SessionListArgs) {
    const {sessions, fetchingSession, startSession} = useSessions(run);

    const sessionCaption = () => {
        if(fetchingSession){
            return <p className="text-secondary">Fetching sessions...</p>
        }

        if(sessions.length === 0){
            return <p>No session found for this run</p>
        }

        return <p>All sessions:</p>
    }

    const sessionTable = () => {
        if(sessions.length !== 0){
            return <table className="table table-dark table-striped border">
                 <thead>
                     <tr>
                         <th scope="col">#</th>
                         <th scope="col">Status</th>
                     </tr>
                </thead>
                <tbody>
                    {sessions.map((session) => <tr style={{cursor: "pointer"}} onClick={() => onSelectSession(session)} key={session.session_id}>
                        <th scope="row"><p>{session.session_id}</p></th>
                        <td><p>{session.status}</p></td>
                    </tr>)}
                </tbody>
            
            </table>
        }
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={startSession}>Add session</button>
            {sessionCaption()}
            {sessionTable()}
            
        </div>
    )
}

export default SessionList
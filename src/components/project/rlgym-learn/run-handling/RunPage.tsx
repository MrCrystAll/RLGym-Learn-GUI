import type { Run } from "rlgym-learn-client"
import { useSessions } from "../../../../hooks/useSessions"

interface RunPageArgs{
    run: Run

    backToHome: () => void
}

function RunPage({run, backToHome}: RunPageArgs){

    const {sessions, fetchingSession} = useSessions(run);

    const sessionsDisplay = () => {
        if(fetchingSession){
            return <p className="text-secondary">Fetching sessions...</p>
        }

        if(sessions.length === 0){
            return <p>No session found for this run</p>
        }
        else{
            return <ul>
                {sessions.map((session, index) => <li key={index}>{session.session_id} - {session.status}</li>)}
            </ul>
        }
    }

    return (
        <div>
            <button className="btn btn-success" onClick={backToHome}>Back to home</button>
            {sessionsDisplay()}
        </div>
    )
}

export default RunPage
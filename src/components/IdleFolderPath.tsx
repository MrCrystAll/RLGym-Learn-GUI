import ChooseDataFolder from "./ChooseDataFolder"
import packageJson from "../../package.json"

interface IdleFolderPathConfig{
  setFolderPath: (path: string) => void
}

function IdleFolderPath({setFolderPath}: IdleFolderPathConfig){
    return (
      <div className="bg-dark">
        <p className="display-1 text-center">RLGym-Learn GUI</p>
        <p className="text-secondary text-center">v{packageJson.version} - Made by CryyStall</p>

        <div className="px-3">
          <p className="display-3">Welcome!</p>
          <p>
            This application is here to accompany users into the creation of their bots. 
            Be it making complicated features more accessible to beginners or abstracting python code,
            you can use this application to create, train and visualize your bot.
            The application only has 1 dependency: rlgym-learn.
            This is what you will use to train your bot or create your own algorithm to train a bot.
          </p>

          <div>
            <p>This application appeals to 2 types of users</p>
            <ul>
              <li><b>Beginner bot trainers</b>: Looking for a way to train a bot without having to deal with pesky scripting</li>
              <li><b>Advanced algorithm creators</b>: Looking for an app to help them debug and monitor their algorithms</li>
            </ul>
          </div>

          <hr></hr>
          
          <div>
            <p className="display-3">How to use</p>
            <p className="fw-medium mb-3">To use the application, you need to set a path to store the projects using the button below</p>
            <p><small className="text-secondary">Clicking the button below will make you quit this page</small></p>
            <ChooseDataFolder text="Choose data folder" setFolderPath={setFolderPath}></ChooseDataFolder>
          </div>

          <hr></hr>

          <div >
            <p className="display-3">Glossary</p>
            <p>Here is a little list of words you might see (or have seen) in this application that could help you</p>
            
            <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr 1fr"}}>
              <div>
              <p className="display-6 fw-bold">Session</p>
              <p>A session is the equivalent of starting the entrypoint of your project, a session contains logs and is identified by the timestamp when it was launched.</p>
            </div>
            <div>
              <p className="display-6 fw-bold">Run</p>
              <p>A run is an aggregation of sessions, this also contains metrics and a configuration that'll be sent to the entrypoint of your project.</p>
            </div>
            <div>
              <p className="display-6 fw-bold">Project</p>
              <p>A project is an aggregation of runs, For now, it is only that, but maybe in the future i'll add project specifics.</p>
            </div>
            <div>
              <p className="display-6 fw-bold">Folder</p>
              <p>The topmost level of the hierarchy, based on your actual folders in your OS, they store projects and allows you to see your projects within your filesystem.</p>
            </div>
            </div>
            
          </div>

          <hr></hr>
          <div>
            <p className="display-3">Contributing</p>
            <div>
              <p>If you are interested in the code of this app. Feel free to check the repositories</p>
              <small className="text-secondary">Clicking on the options below will redirect you to the repos</small>
              <div className="mt-3">
                <p className="bi bi-github" style={{cursor: "pointer"}} onClick={() => window.api.openLink("https://github.com/MrCrystAll/RLGym-Learn-GUI")}> GUI (The application you're seeing right now)</p>
                <p className="bi bi-github" style={{cursor: "pointer"}} onClick={() => window.api.openLink("https://github.com/MrCrystAll/RLGym-Learn-API")}> API (The API running in the background)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default IdleFolderPath
import type { ProjectMetadata } from "../../models/project"

interface ActionButtonsArgs{
  setCurrentProject: (metadata: ProjectMetadata | undefined) => void,
  fetchProjectData: () => void,
  removeProject: () => void,
  startEntrypoint: () => void
}

function ActionButtons({setCurrentProject, fetchProjectData, removeProject, startEntrypoint}: ActionButtonsArgs) {
  return (
    <div className="d-flex btn-group">
        <button className="btn btn-secondary" onClick={() => setCurrentProject(undefined)}>Go back to home screen</button>
        <button className="btn btn-danger" onClick={removeProject}>Delete project</button>
        <button className="btn btn-success" onClick={fetchProjectData}>Refresh project data</button>
        <button className="btn btn-primary" onClick={startEntrypoint}>Start run</button>
    </div>
  )
}

export default ActionButtons

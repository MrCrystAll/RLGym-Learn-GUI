interface ActionButtonsArgs{
  setCurrentProject: (metadata: string | null) => void,
  removeProject: () => void,
  startEntrypoint: () => void
}

function ActionButtons({setCurrentProject, removeProject, startEntrypoint}: ActionButtonsArgs) {
  return (
    <div className="d-flex btn-group">
        <button className="btn btn-secondary" onClick={() => setCurrentProject(null)}>Go back to home screen</button>
        <button className="btn btn-danger" onClick={removeProject}>Delete project</button>
        <button className="btn btn-primary" onClick={startEntrypoint}>Start run</button>
    </div>
  )
}

export default ActionButtons

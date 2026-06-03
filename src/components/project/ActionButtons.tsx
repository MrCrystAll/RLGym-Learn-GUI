interface ActionButtonsArgs{
  setCurrentProject: (metadata: string | null) => void,
  removeProject: () => void
}

function ActionButtons({setCurrentProject, removeProject}: ActionButtonsArgs) {
  return (
    <div className="d-flex btn-group">
        <button className="btn btn-secondary" onClick={() => setCurrentProject(null)}>Go back to home screen</button>
        <button className="btn btn-danger" onClick={removeProject}>Delete project</button>
    </div>
  )
}

export default ActionButtons

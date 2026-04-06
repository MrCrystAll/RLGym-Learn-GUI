function ActionButtons({setCurrentProject, fetchProjectData, removeProject, startEntrypoint}) {
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

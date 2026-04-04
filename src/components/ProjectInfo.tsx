function ProjectInfo({project, setCurrentProject}) {
  return (
    <div className="card w-25">
        <div className="card-header">
            <p className="display-6">{project.name} - {project.version}</p>
        </div>
        <div className="card-body">
            <b>Description</b>
            <p>{project.description}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-success" onClick={() => setCurrentProject(project)}>Open project</button>
        </div>
    </div>
  )
}

export default ProjectInfo

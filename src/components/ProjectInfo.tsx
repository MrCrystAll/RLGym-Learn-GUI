function ProjectInfo({project}) {
  return (
    <div className="card w-25">
        <div className="card-header">
            <p className="display-6">{project.name} - {project.version}</p>
        </div>
        <div className="card-body">
            <b>Description</b>
            <p>{project.description}</p>
        </div>
    </div>
  )
}

export default ProjectInfo

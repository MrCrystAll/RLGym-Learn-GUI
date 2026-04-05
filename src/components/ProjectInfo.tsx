function ProjectInfo({project, setCurrentProject}) {
  return (
    <div className="card w-25">
        <div className="card-header">
            <p className="display-6">{project.name}</p>
            <button className="btn btn-success" onClick={() => setCurrentProject(project)}>Open project</button>
        </div>
    </div>
  )
}

export default ProjectInfo

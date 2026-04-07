function ProjectInfo({project, setCurrentProject}) {
  return (
    <div className="card w-25" onClick={() => setCurrentProject(project)}>
        <div className="card-header" style={{cursor: "pointer"}}>
            <p className="display-5 text-center">{project.name}</p>
        </div>
    </div>
  )
}

export default ProjectInfo

function ProjectMetadata({projectMetadata}) {
  return (
    <div className="d-flex flex-column">
        <p className="d-flex justify-content-center display-6">{projectMetadata.name}</p>
        <p className="d-flex justify-content-center">{projectMetadata.description}</p>
        <p className="d-flex justify-content-center fw-bold">{projectMetadata.path}</p>
        
        <hr className="border border-dark"/>
    </div>
  )
}

export default ProjectMetadata

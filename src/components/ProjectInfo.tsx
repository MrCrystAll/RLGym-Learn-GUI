import type { ProjectMetadata } from "rlgym-learn-client"

interface ProjectInfoArgs {
  project: ProjectMetadata,
  setCurrentProject: () => void
}

function ProjectInfo({project, setCurrentProject}: ProjectInfoArgs) {
  return (
    <div className="card w-25" onClick={setCurrentProject}>
        <div className="card-header" style={{cursor: "pointer"}}>
            <p className="display-5 text-center">{project.name}</p>
        </div>
    </div>
  )
}

export default ProjectInfo

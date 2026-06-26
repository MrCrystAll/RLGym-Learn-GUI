import type { ProjectMetadata } from "rlgym-learn-client"

interface ProjectInfoArgs {
  project: ProjectMetadata,
  setCurrentProject: () => void
}

function ProjectInfo({project, setCurrentProject}: ProjectInfoArgs) {
  return (
    <button className="btn btn-primary" key={project.id} onClick={setCurrentProject}>
        <p className="display-6 text-center">{project.name}</p>
    </button>
  )
}

export default ProjectInfo

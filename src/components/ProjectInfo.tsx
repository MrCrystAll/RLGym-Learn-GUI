import type { ProjectMetadata } from "rlgym-learn-client"

interface ProjectInfoArgs {
  project: ProjectMetadata,
  setCurrentProject: () => void
}

function ProjectInfo({project, setCurrentProject}: ProjectInfoArgs) {
  return (
    <div className="project-list-card border rounded p-2" key={project.id} onClick={setCurrentProject}>
        <p className="display-6 text-center">{project.name}</p>
    </div>
  )
}

export default ProjectInfo

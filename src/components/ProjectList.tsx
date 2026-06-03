import type { ProjectCreationArgs, ProjectMetadata } from "rlgym-learn-client"
import AddProject from "./AddProject"
import ChooseDataFolder from "./ChooseDataFolder"
import ProjectInfo from "./ProjectInfo"

interface ProjectListArgs{
    folderPath: string
    projects: Record<string, ProjectMetadata>

    addProject: (args: ProjectCreationArgs) => void
    setCurrentProject: (project: string | null) => void
    setFolderPath: (folderPath: string) => void
}

export function ProjectList({folderPath, projects, addProject, setCurrentProject, setFolderPath}: ProjectListArgs) {
    

    const addProjectFromName = async (name: string) => {
        addProject({
            name: name
        });
    }

    const projectsRender = () => {
    if(Object.keys(projects).length > 0){
      return (
        <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr fr"}}>
          {Object.values(projects).map(
            (metadata, index) => {
              return <ProjectInfo project={metadata} key={index} setCurrentProject={() => setCurrentProject(metadata.id)}></ProjectInfo>
            }
          )}
        </div>
      )
    }
    else{
      return (
        <p>No projects found.</p>
      )
    }
  }

  return (
    <div className="bg-dark text-light">
      <div className="container-fluid pt-3">
        <ChooseDataFolder text="Update data folder" setFolderPath={setFolderPath}></ChooseDataFolder>
        <AddProject addProject={addProjectFromName}></AddProject>
      </div>
      <div className="m-2">
        <p className="display-3">Projects: </p>
        <small className="my-3"><i className="bi bi-folder me-3"></i>{folderPath}</small>
        <div className="border p-3">
          {projectsRender()}
        </div>
      </div>
    </div>
  )
}
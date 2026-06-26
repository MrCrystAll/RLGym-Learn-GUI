import type { ProjectCreationArgs, ProjectMetadata } from "rlgym-learn-client"
import AddProject from "./AddProject"
import ChooseDataFolder from "./ChooseDataFolder"
import ProjectInfo from "./ProjectInfo"

interface ProjectListArgs{
    folderPath: string | null
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
        <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr 1fr 1fr"}}>
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
        <p>No projects found. Use the + button to create a project in this directory</p>
      )
    }
  }

  return (
    <div className="gray-bg border rounded p-2">
        <div className="d-flex gap-2 mb-2">
          <small className="p-2 rounded border text-break" style={{fontFamily: "monospace"}}>{folderPath}</small>
          <div className="d-flex rounded">
            <ChooseDataFolder setFolderPath={setFolderPath}></ChooseDataFolder>
            <div>
              <AddProject addProject={addProjectFromName}></AddProject>
            </div>
          </div>
        </div>
        {projectsRender()}
    </div>
  )
}
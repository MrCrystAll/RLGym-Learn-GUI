
import { useEffect, useState } from "react";
import IdleAPI from "./components/IdleAPI";
import IdleFolderPath from "./components/IdleFolderPath";
import { useApp } from "./hooks/useApp";
import ProjectEditor from "./components/ProjectEditor";
import { NotificationContainer } from "./components/NotificationContainer";
import { ProjectList } from "./components/ProjectList";
import { useProjects } from "./hooks/useProjects";
import packageJson from "../package.json"

function App() {
  // API
  const {error, startingAPI, isBugged, setCurrentProject, currentProject, startApi, folderPath, setFolder} = useApp();

  // Projects
  const {projects, addProject, updateProject, deleteProject} = useProjects({folderPath});

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useState(prefersDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    startApi();
  }, [])

  const appRender = () => {
    if(startingAPI)
  {
    return (
      <IdleAPI isBugged={isBugged} error={error} startingAPI={startingAPI}></IdleAPI>
      )
  }
  else if(folderPath === null){
    return (
      <IdleFolderPath theme={theme} setTheme={setTheme} setFolderPath={setFolder}></IdleFolderPath>
    )
  }
  else{
    return projectRender();
  }
  }

  const projectRender = () => {
    const header = <div className="d-flex justify-content-between border-bottom mx-2">
          <div className="mb-2">
            <h1>RLGym-Learn GUI</h1>
            <li className="d-flex" >
              <i className="bi bi-sun"></i>

              <div className="ms-2 form-check form-switch">
                <input className="form-check-input" type="checkbox" defaultChecked={theme === "dark"} role="switch" onChange={(event) => setTheme(event.target.checked ? "dark" : "light")} />
              </div>
              <i className="bi bi-moon"></i>
            </li>
          </div>
          
          
          <p className="align-self-center">Version {packageJson.version}</p>

        </div>
    if(currentProject === null){
      return (
        <div className="p-3">
          {header}
          <p className="display-5 mt-3">Project list</p>
          <p className="mt-3">Here is the projects list, this list is organized in the following way. The topmost level of hierarchy is folders, you got asked for a specific folder before. Folders store projects, and in order to retrieve and organize those projects, this list aggregates the projects per folder. For now, you can only have 1 folder, but i plan on adding a multi-folder support later.</p>
          <ProjectList addProject={addProject} projects={projects} folderPath={folderPath} setCurrentProject={setCurrentProject} setFolderPath={setFolder}></ProjectList>
        </div>
      )
    }
    else{
      return (
        <div className="p-3">
          {header}
          <ProjectEditor setCurrentProject={setCurrentProject} updateProjectList={updateProject} removeProject={deleteProject} project={projects[currentProject]}/>
        </div>
    )}
  }

  return (
    <div>
        <div>
          {appRender()}
        </div>
        <NotificationContainer></NotificationContainer>
    </div>
  )

  
}

export default App

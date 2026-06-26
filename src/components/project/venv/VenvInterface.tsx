import { useState } from "react";
import VenvCreateInterface from "./VenvCreateInterface";
import type { ProjectMetadata } from "rlgym-learn-client";
import { openDialog } from "../../../api";

const mockData = {
    packages: {
  "annotated-doc": "0.0.4",
  "annotated-types": "0.7.0",
  "anyio": "4.11.0",
  "certifi": "2026.4.22",
  "click": "8.3.3",
  "cmeel": "0.60.1",
  "colorama": "0.4.6",
  "dnspython": "2.8.0",
  "email-validator": "2.3.0",
  "fastapi": "0.121.1",
  "fastapi-cli": "0.0.24",
  "fastapi-cloud-cli": "0.17.0",
  "fastar": "0.11.0",
  "h11": "0.16.0",
  "httpcore": "1.0.9",
  "httptools": "0.7.1",
  "httpx": "0.28.1",
  "idna": "3.11",
  "Jinja2": "3.1.6",
  "markdown-it-py": "4.0.0",
  "MarkupSafe": "3.0.3",
  "mdurl": "0.1.2",
  "numpy": "2.4.4",
  "pip": "26.1.2",
  "pydantic": "2.12.4",
  "pydantic_core": "2.41.5",
  "Pygments": "2.20.0",
  "python-dotenv": "1.2.2",
  "python-multipart": "0.0.26",
  "PyYAML": "6.0.3",
  "rich": "15.0.0",
  "rich-toolkit": "0.19.7",
  "rignore": "0.7.6",
  "rlgym": "2.0.1",
  "rlgym-api": "2.0.0",
  "rlgym-learn": "1.0.5",
  "rlgym-rocket-league": "2.0.1",
  "rlviser-py": "0.6.13",
  "rocketsim": "2.2.1",
  "sentry-sdk": "2.58.0",
  "shellingham": "1.5.4",
  "sniffio": "1.3.1",
  "starlette": "0.49.3",
  "tqdm": "4.68.3",
  "typer": "0.25.0",
  "typing_extensions": "4.15.0",
  "typing-inspection": "0.4.2",
  "urllib3": "2.6.3",
  "uvicorn": "0.46.0",
  "watchfiles": "1.1.1",
  "websockets": "16.0"
},
    toUpdate: {
        "rlviser-py": true
    }
}

interface VenvInterfaceArgs{
    projectMetadata: ProjectMetadata
}

function VenvInterface({projectMetadata}: VenvInterfaceArgs) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleClose = () => setIsCreateModalOpen(false);
    const handleShow = () => setIsCreateModalOpen(true);

    const createVenv = (python_executable: string) => {
        console.log(python_executable);
        handleClose();
    }

    const venv_display = () => {
        if(projectMetadata.interpreter !== null){
            return <div>
                <div>
                    
                </div>

                <div className="btn-group">
                    <button className="btn">Check packages</button>
                    <button className="btn">Delete environment</button>
                </div>
            </div> 
        }
        return <div>
            <VenvCreateInterface defaultInterpreter={projectMetadata.interpreter} isOpen={isCreateModalOpen} handleClose={handleClose} formSubmit={createVenv}></VenvCreateInterface>
            <button className="btn btn-outline-warning" onClick={handleShow}>Create virtual environment</button>
        </div>

    }

    if(projectMetadata.interpreter === null){
        return <div className="border p-2 mb-2 rounded">
            <div>
                <VenvCreateInterface isOpen={isCreateModalOpen} handleClose={handleClose} formSubmit={createVenv}></VenvCreateInterface>
            </div>
            <div>
                <div>
                <p className="display-6">No interpreter!</p>
                <p>This project has no interpreter. You can't run a project without an interpreter. </p>

                <p>You can choose to pick an arbitrary python executable or let the application handle the python end.</p>


                <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => openDialog().then(
                        (path) => console.log("Update interpreter: " + path)
                    ).catch()}>

                    Pick a python executable <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn btn-primary" onClick={handleShow}>

                        Let the application handle my python
                    </button>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className="border p-2 mb-2">
            <div className="d-flex gap-2">
                <p className="display-6">Python environment</p>
                <button className="btn btn-primary p-2 my-auto bi bi-folder" onClick={() => console.error("TODO: Open dialog to python executable.")
                }></button>
            </div>

            <div className="btn-group">
                <button className="btn btn-outline-info">Check packages</button>
                <button className="btn btn-outline-danger">Delete environment</button>
            </div>         
        </div>
    )
}

export default VenvInterface
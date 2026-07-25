import { useState } from "react";
import VenvCreateInterface from "./VenvCreateInterface";
import type { ProjectMetadata } from "rlgym-learn-client";
import { openDialog } from "../../../api";
import VenvRLGymPackages from "./VenvRLGymPackages";
import FullPackageList from "./FullPackageList";
import { useVenv } from "../../../hooks/useVenv";

const mockData = {
    packages: {
  "annotated-doc": {
    "name": "annotated-doc",
    "version": "0.0.4",
    "summary": "Document parameters, class attributes, return types, and variables inline, with Annotated."
  },
  "annotated-types": {
    "name": "annotated-types",
    "version": "0.7.0",
    "summary": "Reusable constraint types to use with typing.Annotated"
  },
  "anyio": {
    "name": "anyio",
    "version": "4.11.0",
    "summary": "High-level concurrency and networking framework on top of asyncio or Trio"
  },
  "certifi": {
    "name": "certifi",
    "version": "2026.4.22",
    "summary": "Python package for providing Mozilla's CA Bundle."
  },
  "click": {
    "name": "click",
    "version": "8.3.3",
    "summary": "Composable command line interface toolkit"
  },
  "cmeel": {
    "name": "cmeel",
    "version": "0.60.1",
    "summary": "Create Wheel from CMake projects"
  },
  "colorama": {
    "name": "colorama",
    "version": "0.4.6",
    "summary": "Cross-platform colored terminal text."
  },
  "dnspython": {
    "name": "dnspython",
    "version": "2.8.0",
    "summary": "DNS toolkit"
  },
  "email-validator": {
    "name": "email-validator",
    "version": "2.3.0",
    "summary": "A robust email address syntax and deliverability validation library."
  },
  "fastapi": {
    "name": "fastapi",
    "version": "0.121.1",
    "summary": "FastAPI framework, high performance, easy to learn, fast to code, ready for production"
  },
  "fastapi-cli": {
    "name": "fastapi-cli",
    "version": "0.0.24",
    "summary": "Run and manage FastAPI apps from the command line with FastAPI CLI. 🚀"
  },
  "fastapi-cloud-cli": {
    "name": "fastapi-cloud-cli",
    "version": "0.17.0",
    "summary": "Deploy and manage FastAPI Cloud apps from the command line 🚀"
  },
  "fastar": {
    "name": "fastar",
    "version": "0.11.0",
    "summary": "High-level bindings for the Rust tar crate"
  },
  "h11": {
    "name": "h11",
    "version": "0.16.0",
    "summary": "A pure-Python, bring-your-own-I/O implementation of HTTP/1.1"
  },
  "httpcore": {
    "name": "httpcore",
    "version": "1.0.9",
    "summary": "A minimal low-level HTTP client."
  },
  "httptools": {
    "name": "httptools",
    "version": "0.7.1",
    "summary": "A collection of framework independent HTTP protocol utils."
  },
  "httpx": {
    "name": "httpx",
    "version": "0.28.1",
    "summary": "The next generation HTTP client."
  },
  "idna": {
    "name": "idna",
    "version": "3.11",
    "summary": "Internationalized Domain Names in Applications (IDNA)"
  },
  "Jinja2": {
    "name": "Jinja2",
    "version": "3.1.6",
    "summary": "A very fast and expressive template engine."
  },
  "markdown-it-py": {
    "name": "markdown-it-py",
    "version": "4.0.0",
    "summary": "Python port of markdown-it. Markdown parsing, done right!"
  },
  "MarkupSafe": {
    "name": "MarkupSafe",
    "version": "3.0.3",
    "summary": "Safely add untrusted strings to HTML/XML markup."
  },
  "mdurl": {
    "name": "mdurl",
    "version": "0.1.2",
    "summary": "Markdown URL utilities"
  },
  "numpy": {
    "name": "numpy",
    "version": "2.4.4",
    "summary": "Fundamental package for array computing in Python"
  },
  "pip": {
    "name": "pip",
    "version": "26.1.2",
    "summary": "The PyPA recommended tool for installing Python packages."
  },
  "pydantic": {
    "name": "pydantic",
    "version": "2.12.4",
    "summary": "Data validation using Python type hints"
  },
  "pydantic_core": {
    "name": "pydantic_core",
    "version": "2.41.5",
    "summary": "Core functionality for Pydantic validation and serialization"
  },
  "Pygments": {
    "name": "Pygments",
    "version": "2.20.0",
    "summary": "Pygments is a syntax highlighting package written in Python."
  },
  "python-dotenv": {
    "name": "python-dotenv",
    "version": "1.2.2",
    "summary": "Read key-value pairs from a .env file and set them as environment variables"
  },
  "python-multipart": {
    "name": "python-multipart",
    "version": "0.0.26",
    "summary": "A streaming multipart parser for Python"
  },
  "PyYAML": {
    "name": "PyYAML",
    "version": "6.0.3",
    "summary": "YAML parser and emitter for Python"
  },
  "rich": {
    "name": "rich",
    "version": "15.0.0",
    "summary": "Render rich text, tables, progress bars, syntax highlighting, markdown and more to the terminal"
  },
  "rich-toolkit": {
    "name": "rich-toolkit",
    "version": "0.19.7",
    "summary": "Rich toolkit for building command-line applications"
  },
  "rignore": {
    "name": "rignore",
    "version": "0.7.6",
    "summary": "Python Bindings for the ignore crate"
  },
  "rlgym": {
    "name": "rlgym",
    "version": "2.0.1",
    "summary": "A python API with zero dependencies to create fully customizable environments for Reinforcement Learning projects."
  },
  "rlgym-api": {
    "name": "rlgym-api",
    "version": "2.0.0",
    "summary": "A python API with zero dependencies to create fully customizable environments for Reinforcement Learning projects."
  },
  "rlgym-learn": {
    "name": "rlgym-learn",
    "version": "1.0.5",
    "summary": "A generic framework for using learning algorithms with effecient parallelization of RLGym environments and an ergonomic API"
  },
  "rlgym-rocket-league": {
    "name": "rlgym-rocket-league",
    "version": "2.0.1",
    "summary": "A python API that can be used to treat the game Rocket League as a Gym-like environment for Reinforcement Learning projects."
  },
  "rlviser-py": {
    "name": "rlviser-py",
    "version": "0.6.13",
    "summary": "Python implementation that manages a UDP connection to RLViser"
  },
  "rocketsim": {
    "name": "rocketsim",
    "version": "2.2.1",
    "summary": "This is Rocket League!"
  },
  "sentry-sdk": {
    "name": "sentry-sdk",
    "version": "2.58.0",
    "summary": "Python client for Sentry (https://sentry.io)"
  },
  "shellingham": {
    "name": "shellingham",
    "version": "1.5.4",
    "summary": "Tool to Detect Surrounding Shell"
  },
  "sniffio": {
    "name": "sniffio",
    "version": "1.3.1",
    "summary": "Sniff out which async library your code is running under"
  },
  "starlette": {
    "name": "starlette",
    "version": "0.49.3",
    "summary": "The little ASGI library that shines."
  },
  "tqdm": {
    "name": "tqdm",
    "version": "4.68.3",
    "summary": "Fast, Extensible Progress Meter"
  },
  "typer": {
    "name": "typer",
    "version": "0.25.0",
    "summary": "Typer, build great CLIs. Easy to code. Based on Python type hints."
  },
  "typing_extensions": {
    "name": "typing_extensions",
    "version": "4.15.0",
    "summary": "Backported and Experimental Type Hints for Python 3.9+"
  },
  "typing-inspection": {
    "name": "typing-inspection",
    "version": "0.4.2",
    "summary": "Runtime typing introspection tools"
  },
  "urllib3": {
    "name": "urllib3",
    "version": "2.6.3",
    "summary": "HTTP library with thread-safe connection pooling, file post, and more."
  },
  "uvicorn": {
    "name": "uvicorn",
    "version": "0.46.0",
    "summary": "The lightning-fast ASGI server."
  },
  "watchfiles": {
    "name": "watchfiles",
    "version": "1.1.1",
    "summary": "Simple, modern and high performance file watching and code reload in python."
  },
  "websockets": {
    "name": "websockets",
    "version": "16.0",
    "summary": "An implementation of the WebSocket Protocol (RFC 6455 & 7692)"
  }
},
    toUpdate: {
        "rlviser-py": true
    }
}

interface VenvInterfaceArgs{
    projectMetadata: ProjectMetadata,
    updateProjectExecutable: (pythonExecutable: string | null) => void
}

function VenvInterface({projectMetadata, updateProjectExecutable}: VenvInterfaceArgs) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

    const handleCreateClose = () => setIsCreateModalOpen(false);
    const handleCreateShow = () => setIsCreateModalOpen(true);

    const handlePackageClose = () => setIsPackageModalOpen(false);
    const handlePackageShow = () => setIsPackageModalOpen(true);

    const {createVenv} = useVenv({metadata: projectMetadata, updatePythonInterpreter: updateProjectExecutable})

    const createVenvModal = (python_executable: string) => {
        createVenv(python_executable).then(
          () => handleCreateClose()
        );
        
    }

    if(projectMetadata.interpreter === null){
        return <div className="mb-2 rounded">
            <div>
                <VenvCreateInterface isOpen={isCreateModalOpen} handleClose={handleCreateClose} formSubmit={createVenvModal}></VenvCreateInterface>
            </div>
            <div>
                <div>
                <p className="display-6">No interpreter!</p>
                <p>This project has no interpreter. You can't run a project without an interpreter. </p>

                <p>You can choose to pick an arbitrary python executable or let the application handle the python end.</p>

                <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => openDialog().then(
                        (path) => updateProjectExecutable(path)
                    ).catch()}>

                    Pick a python executable <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn btn-primary" onClick={handleCreateShow}>

                        Let the application handle my python
                    </button>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className="mb-2">
            <FullPackageList packages={mockData.packages} handleClose={handlePackageClose} isOpen={isPackageModalOpen} updateStatus={mockData.toUpdate} update={(name) => console.log(name, "Update")} installRequirements={(reqPath) => console.log("Install requirements at", reqPath)
            } uninstall={(name) => console.log(name, "Uninstall")} install={(name) => console.log(name, "Install")
            }></FullPackageList>
            <div className="d-flex gap-2">
                <p className="display-6">Python environment</p>
                <button className="btn btn-primary p-2 my-auto bi bi-folder" onClick={() => console.error("TODO: Open dialog to python executable.")
                }></button>
            </div>

            <p className="fw-bold">RLGym related packages</p>
            <VenvRLGymPackages packages={mockData.packages} install={(name) => console.log(name + " install")} updateStatus={mockData.toUpdate} update={(name) => console.log(name, "Update")} uninstall={(name) => console.log(name, "Uninstall")}></VenvRLGymPackages>

            <div className="btn-group mt-2">
                <button className="btn btn-outline-info" onClick={handlePackageShow}>Check packages</button>
                <button className="btn btn-outline-danger" onClick={() => console.log("Delete venv")
                }>Delete environment</button>
            </div>
        </div>
    )
}

export default VenvInterface
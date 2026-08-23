import { Dropdown } from "react-bootstrap"

interface DefaultPythonInterpretersArgs{
    setPythonInterpreter: (interpreter: string | null) => void
    pythonDefaults: Record<string, string>
}

function DefaultPythonInterpreters({setPythonInterpreter, pythonDefaults}: DefaultPythonInterpretersArgs){

    return (

        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Default interpreters
            </Dropdown.Toggle>

            <Dropdown.Menu className="border">
                {Object.entries(pythonDefaults).map(
                 ([path, version]) => <div key={path}>
                    <Dropdown.Item text-wrap="true" onClick={() => setPythonInterpreter(path)}>

                    <div>
                        <p className="fw-bold">Python {version}</p>
                        <p className="text-wrap text-break">{path}</p>
                    </div>
                        
                    </Dropdown.Item>
                    <Dropdown.Divider></Dropdown.Divider>
                 </div>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DefaultPythonInterpreters
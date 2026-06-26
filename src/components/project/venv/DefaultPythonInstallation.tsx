import React from "react";
import { forwardRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap"

const mockInterpreters = {
    "A reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaally long path": "3.14.1",
    "Path2": "3.12.3"
}

interface DefaultPythonInterpretersArgs{
    setPythonInterpreter: (interpreter: string | null) => void
    pythonInterpreter: string | null
}

function DefaultPythonInterpreters({setPythonInterpreter}: DefaultPythonInterpretersArgs){


    return (

        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Default interpreters
            </Dropdown.Toggle>

            <Dropdown.Menu className="border">
                {Object.entries(mockInterpreters).map(
                 ([path, version]) => <Dropdown.Item  onClick={() => setPythonInterpreter(path)}>

                    <div>
                        <p className="text-break">Python {version} - {path}</p>
                    </div>
                        
                    </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DefaultPythonInterpreters
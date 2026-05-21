import { useEffect, useRef } from "react";
import Tooltip from 'bootstrap/js/dist/tooltip'

interface ToggleFieldArgs{
    value: boolean
    text: string
    icon: string
    help: string

    onToggle: () => void
}

function ToggleField({value, text, icon, help, onToggle}: ToggleFieldArgs) {

    const tooltipHolder = useRef(null)

    useEffect(() => {
        const tooltip = new Tooltip(tooltipHolder.current)

        return () => tooltip.dispose()
    }, [])

    return (
        <div className="d-flex px-2 pt-3">
            <i className={"bi bi-" + icon + " ms-2"}></i>
            <div className="d-flex mx-3 flex-fill">
                <p style={{cursor: "help"}} data-bs-toggle="tooltip" data-bs-placement="right"
        data-bs-title={help} ref={tooltipHolder} className="me-2">{text}</p>
            </div>
            
            <div style={{cursor: "pointer"}} onClick={onToggle}>
                <i className="bi bi-circle-fill" style={{color: value ? "green" : "red"}}></i>
                <p className="badge">{value ? "Enabled" : "Disabled"}</p>
            </div>
        </div>
    )
}

export default ToggleField
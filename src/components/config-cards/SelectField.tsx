import { useEffect, useRef } from "react";
import Tooltip from 'bootstrap/js/dist/tooltip'

interface NumberFieldArgs{
    values: string[]
    defaultValue: string
    text: string
    help: string
    icon: string

    onChange: (value: string) => void
}

function SelectField({values, defaultValue, text, icon, help, onChange}: NumberFieldArgs) {
    const tooltipHolder = useRef(null)

    useEffect(() => {
        const tooltip = new Tooltip(tooltipHolder.current)

        return () => tooltip.dispose()
    }, [])
    const fieldValue = () => {
        return <select className="bg-dark text-light rounded mb-2" defaultValue={defaultValue} onChange={(event) => onChange(event.target.value)}>
            {values.map((value) => <option key={value} value={value} className="">{value}</option>)}
        </select>
    }

    return (
        <div className="d-flex px-2 pt-3">
            <i className={"bi bi-" + icon + " ms-2"}></i>
            <div className="d-flex mx-3 flex-fill">
                <p style={{cursor: "help"}} data-bs-toggle="tooltip" data-bs-placement="right"
        data-bs-title={help} ref={tooltipHolder} className="me-2">{text}</p>
            </div>
            
            {fieldValue()}
        </div>
    )
}

export default SelectField
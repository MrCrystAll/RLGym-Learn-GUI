import { useEffect, useRef, useState } from "react";
import Tooltip from 'bootstrap/js/dist/tooltip'
import { useForm, type SubmitHandler } from "react-hook-form";

interface NumberFieldArgs{
    value: number | null
    text: string
    help: string
    intOnly: boolean

    onChange: (value: number | null) => void
}

function NumberCard({value, text, help, intOnly, onChange}: NumberFieldArgs) {
    const [editMode, setEditMode] = useState(false);
    const {register, handleSubmit} = useForm({defaultValues: {value: value}})

    const tooltipHolder = useRef(null)

    useEffect(() => {
        const tooltip = new Tooltip(tooltipHolder.current)

        return () => tooltip.dispose()
    }, [])

    const onSubmit: SubmitHandler<{value: number | null}> = (data) => {
        onChange(Number.isNaN(data.value) ? null : data.value)

        setEditMode(false);
    }

    const fieldValue = () => {
        if(editMode){
            return <form className="mt-3 col-3" onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control" step={intOnly ? 1 : 1e-10} type="number" {...register("value", {valueAsNumber: true, required: false})}></input>
            </form>
        }
        return <p onClick={() => setEditMode(true)} className="display-5 mt-3">{value === null ? "--" : value}</p>
    }

    return (
        <div className="d-flex flex-column border border-dark rounded px-3 flex-fill bg-configuration-card" data-bs-toggle="tooltip" data-bs-placement="top"
    data-bs-title={help} ref={tooltipHolder} style={{cursor: "help"}}>
            {fieldValue()}
            <div className="d-flex flex-fill">
                <p className="fs-6 fw-lighter">{text}</p>
            </div>
        </div>
    )
}

export default NumberCard
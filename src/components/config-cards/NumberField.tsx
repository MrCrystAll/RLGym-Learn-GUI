import { useEffect, useRef, useState } from "react";
import Tooltip from 'bootstrap/js/dist/tooltip'
import { useForm, type SubmitHandler } from "react-hook-form";

interface NumberFieldArgs{
    value: number | null
    text: string
    icon: string
    help: string

    onChange: (value: number | null) => void
}

function NumberField({value, text, icon, help, onChange}: NumberFieldArgs) {
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
            return <form onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control" step={1e-10} type="number" {...register("value", {valueAsNumber: true, required: false})}></input>
            </form>
        }
        return <p>{value === null ? "--" : value}</p>
    }

    return (
        <div className="d-flex px-2 pt-3">
            <i className={"bi bi-" + icon + " ms-2"}></i>
            <div className="d-flex mx-3 flex-fill">
                <p style={{cursor: "help"}} data-bs-toggle="tooltip" data-bs-placement="right"
        data-bs-title={help} ref={tooltipHolder} className="me-2">{text}</p>
            </div>
            
            <div onClick={() => setEditMode(true)}>
                {fieldValue()}
            </div>
        </div>
    )
}

export default NumberField
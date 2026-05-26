import { useEffect, useRef, useState } from "react";
import Tooltip from 'bootstrap/js/dist/tooltip'
import { useForm, type SubmitHandler } from "react-hook-form";

interface StringFieldArgs{
    value: string | null
    text: string
    icon: string
    help: string
    required?: boolean

    onChange: (value: string | null) => void
}

function StringField({value, text, icon, help, required, onChange}: StringFieldArgs) {
    const [editMode, setEditMode] = useState(false);
    const {register, handleSubmit} = useForm({defaultValues: {value: value}})

    const tooltipHolder = useRef(null)

    useEffect(() => {
        const tooltip = new Tooltip(tooltipHolder.current)

        return () => tooltip.dispose()
    }, [])

    const onSubmit: SubmitHandler<{value: string | null}> = (data) => {
        onChange(data.value === null || data.value.trim() == "" ? null : data.value)

        setEditMode(false);
    }

    const fieldValue = () => {
        if(editMode){
            return <form onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control" type="text" {...register("value", {required: required === undefined ? false : required})}></input>
            </form>
        }
        return <p>{value === null || value.trim() === "" ? "--" : value}</p>
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

export default StringField
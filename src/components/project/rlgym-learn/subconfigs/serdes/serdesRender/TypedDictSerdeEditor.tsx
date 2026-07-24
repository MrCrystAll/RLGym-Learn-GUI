import { useState } from "react";
import { Serde, type PyAnySerdeType, type TypedDictSerdeType } from "../../../../../../models/rlgym-learn/api";
import SerdesSelect from "../SerdesSelect";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createRules } from "../../../../../../models/validators";

interface TypedDictSerdeEditorArgs{
    serdeConfig: TypedDictSerdeType
    setSerdeConfig: (model: TypedDictSerdeType) => void
}

interface AddSerdeArgs{
    key: string
}

function TypedDictSerdeEditor({serdeConfig, setSerdeConfig}:TypedDictSerdeEditorArgs) {
    const [editMode, setEditMode] = useState(false);

    const {register, handleSubmit, reset, setError, formState: {errors}} = useForm<AddSerdeArgs>();

    const updateAt = (model: PyAnySerdeType, name: string) => {
        const object = {...serdeConfig.key_serde_type_dict}

        object[name] = model

        setSerdeConfig({
            ...serdeConfig,
            key_serde_type_dict: object
        })
    }
    
    const deleteAt = (name: string) => {
        const object = {...serdeConfig.key_serde_type_dict}

        delete object[name];

        setSerdeConfig({
            ...serdeConfig,
            key_serde_type_dict: object
        })
    }

    const onSubmit: SubmitHandler<AddSerdeArgs> = (data) => {
        if(serdeConfig.key_serde_type_dict[data.key] !== undefined){
            setError("key", {message: "This key already exists in this dictionary"})
            return;
        }

        setSerdeConfig({
            ...serdeConfig,
            key_serde_type_dict: {...serdeConfig.key_serde_type_dict, [data.key]: Serde.FLOAT()}
        })
        
        setEditMode(false);
    }

    const addForm = () => {
        if(editMode){
            return <form onSubmit={handleSubmit(onSubmit)} className="col-3">
                <div className="form-group">
                    <label className="mb-2">Key name</label>
                    <input className="form-control" {...register("key", createRules({required: true}))}></input>
                    <small className="text-danger">{errors.key?.message}</small>
                </div>
                <div className="btn-group mt-2">
                    <button className="btn btn-success" type="submit">Add</button>
                    <button className="btn btn-danger" onClick={() => {reset({key: ""}); setEditMode(false)}} type="button">Cancel</button>
                </div>
            </form>
        }
        else{
            return <button className="btn mt-3" onClick={() => setEditMode(true)}>Add element</button>
        }
    }

    return (
        <div>
            {
                Object.entries(serdeConfig.key_serde_type_dict).map(
                    (value: [string, PyAnySerdeType]) => {
                        return <div className="d-flex mt-2" key={value[0]}>
                            <p className="me-2 my-auto">{value[0]}</p>
                            <div className="d-flex flex-fill">
                                <div className="flex-fill">
                                    <SerdesSelect serdeConfig={value[1]} setSerdeConfig={(model) => updateAt(model, value[0])}></SerdesSelect>
                                </div>
                                <button className="btn btn-danger ms-2" onClick={() => deleteAt(value[0])}><i className="bi bi-x"></i></button>
                            </div>
                        </div>
                    }
                )
            }
            {addForm()}
            
        </div>
    )
}

export default TypedDictSerdeEditor
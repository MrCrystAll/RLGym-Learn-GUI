import { useState } from "react";
import { type BaseConfigModel, type SerdeTypesModel } from "../../../../models/rlgym-learn/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createRules } from "../../../../models/validators";
import SerdesConfigEditor from "./serdes/SerdesConfigEditor";

export interface BaseConfigEditorArgs{
    baseConfig: BaseConfigModel
    setBaseConfig: (model: BaseConfigModel) => void

}

function BaseConfigEditor({baseConfig, setBaseConfig}:BaseConfigEditorArgs) {
    const [editMode, setEditMode] = useState(false);
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm<BaseConfigModel>({
        defaultValues: baseConfig
    });

    const onSubmit: SubmitHandler<BaseConfigModel> = (data) => {

        const finalData: BaseConfigModel = {
            ...data,
            serde_types: baseConfig.serde_types
        }

        setBaseConfig(finalData);
        setEditMode(false);
    }

    const onCancel = () => {
        reset(baseConfig);
        setEditMode(false);
    }

    const baseModelEditor = () => {

        if(editMode){
            return (
                <form onSubmit={handleSubmit(onSubmit)} className="border p-3">
                    <div className="d-flex">
                        <div className="col-6">
                            <p className="display-5">Base config options</p>
                            <hr className="w-75"/>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Seed</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" {...register(
                                        "random_seed",
                                        {...createRules({required: true}), valueAsNumber: true}
                                    )}/>
                                    <small className="text-danger">{errors.random_seed?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">FLinks folder</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" {...register(
                                        "flinks_folder",
                                        createRules({required: true})
                                    )}/>
                                    <small className="text-danger">{errors.flinks_folder?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Shared memory buffer size</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" {...register(
                                        "shm_buffer_size",
                                        {...createRules({required: true, min: 0}), valueAsNumber: true}
                                    )}/>
                                    <small className="text-danger">{errors.shm_buffer_size?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Timestep limit</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" {...register(
                                        "timestep_limit",
                                        {...createRules({required: true, min: 1}), valueAsNumber: true}
                                    )}/>
                                    <small className="text-danger">{errors.timestep_limit?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Batched tensor action associated learning data</label>
                                <div className="col-sm-6">
                                    <input type="checkbox" className="form-check-input" {...register(
                                        "batched_tensor_action_associated_learning_data"
                                    )}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="btn-group">
                            <button className="btn btn-primary" type="submit">Submit base config</button>
                            <button className="btn btn-danger" type="button" onClick={onCancel}>Cancel</button>
                        </div>
                </form>
            )
        }

        return (
            <>
                <div className="d-flex">
                    <p className="display-6">Base config</p>
                    <button className="btn btn-dark" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill"></i></button>
                </div>
                
                <p className="text-break">{JSON.stringify(baseConfig)}</p>
            </>
        )
    }

    return (
        <>
            {baseModelEditor()}
            <SerdesConfigEditor serdesTypesModel={baseConfig.serde_types} setSerdesTypesModel={
                (model: SerdeTypesModel) => setBaseConfig({
                    ...baseConfig,
                    serde_types: model
                })
            }></SerdesConfigEditor>
        </>
    )
}

export default BaseConfigEditor
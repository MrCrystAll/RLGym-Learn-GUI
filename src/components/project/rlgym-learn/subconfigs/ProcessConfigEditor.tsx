import { useState } from "react";
import type { ProcessConfigModel } from "../../../../models/rlgym-learn/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createRules } from "../../../../models/validators";

export interface ProcessConfigModelEditorArgs{
    processConfig: ProcessConfigModel
    setProcessConfig: (model: ProcessConfigModel) => void
}

function ProcessConfigEditor({processConfig, setProcessConfig}:ProcessConfigModelEditorArgs) {
    const [editMode, setEditMode] = useState(false);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ProcessConfigModel>({
        defaultValues: processConfig
    })
    
    const onSubmit: SubmitHandler<ProcessConfigModel> = (data) => {
        setProcessConfig(data);
        setEditMode(false);
    }

    const onCancel = () => {
        reset(processConfig);
        setEditMode(false);
    }

    if(editMode){
        return (
            <div className="border p-3">
                <p className="display-5">Process config options</p>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-between">
                    <div className="col-5">
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Min process step per inference</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" {...register(
                                    "min_process_steps_per_inference",
                                    {...createRules({
                                        required: true,
                                        min: 1
                                    }), valueAsNumber: true}
                                )}/>
                                <small className="text-danger">{errors.min_process_steps_per_inference?.message}</small>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Number of processes</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" {...register(
                                    "n_proc",
                                    {...createRules({required: true, min: 1}), valueAsNumber: true}
                                )}/>
                                <small className="text-danger">{errors.n_proc?.message}</small>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Recalculate agents every step</label>
                            <div className="col-sm-9">
                                <input type="checkbox" className="form-check-input" {...register("recalculate_agent_id_every_step")}/>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-primary" type="submit">Submit process config</button>
                            <button className="btn btn-danger" type="button" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Render</label>
                            <div className="col-sm-9">
                                <input type="checkbox" className="form-check-input" {...register("render")}/>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Render delay</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" step={1e-5} {...register(
                                    "render_delay",
                                    {...createRules({required: true, min: 0}), valueAsNumber: true}
                                )}/>
                                <small className="text-danger">{errors.render_delay?.message}</small>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Instance delay between launches</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" {...register(
                                    "instance_launch_delay",
                                    {...createRules({required: false, min: 0}), valueAsNumber: true}
                                )}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <>
        <div className="d-flex">
            <p className="display-6">Process config</p>
            <button className="btn btn-dark float-end" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill"></i></button>
        </div>
            

            <p className="text-break">{JSON.stringify(processConfig)}</p>
        </>
    )
}

export default ProcessConfigEditor
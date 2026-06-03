import { useState } from "react";
import type { PPOLearnerConfigModel } from "../../../../../models/rlgym-learn/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createRules } from "../../../../../models/validators";

interface PPOLearnerConfigEditorArgs{
    ppoLearnerConfig: PPOLearnerConfigModel
    setPPOLearnerConfig: (config: PPOLearnerConfigModel) => void
    agentKey: string
}

function PPOLearnerConfigEditor({ppoLearnerConfig, setPPOLearnerConfig, agentKey}: PPOLearnerConfigEditorArgs) {
    const [editMode, setEditMode] = useState(false);

    const { register, handleSubmit, reset, formState: {errors} } = useForm<PPOLearnerConfigModel>({
        defaultValues: ppoLearnerConfig
    });

    const onSubmit: SubmitHandler<PPOLearnerConfigModel> = (data) => {
        setPPOLearnerConfig(data);
        setEditMode(false);
    }

    if(editMode){
        return (
            <div className="border m-3 p-3">
                <p className="display-5">"{agentKey}" (PPO) Learner options</p>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-between">
                <div className="col-5">
                    <div className="form-group mb-3 row">
                        <label className="col-sm-3 col-form-label">Actor LR</label>
                        <div className="col-sm-9">
                            <input {...register("actor_lr", {...createRules({required: true, min: 0}), valueAsNumber: true})} type="number" step={0.0000001} className="form-control"/>
                            <small className="text-danger">{errors.actor_lr?.message}</small>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-sm-3 col-form-label">Critic LR</label>
                        <div className="col-sm-9">
                            <input type="number" {...register("critic_lr", {...createRules({required: true, min: 0}), valueAsNumber: true})} step={1E-9} className="form-control"/>
                            <small className="text-danger">{errors.critic_lr?.message}</small>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-sm-3 col-form-label">Normalize advantages?</label>
                        <div className="col-sm-9">
                            <input type="checkbox" {...register("advantage_normalization")} className="form-check-input"/>
                            <small className="text-danger">{errors.advantage_normalization?.message}</small>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-sm-3 col-form-label">Batch size</label>
                        <div className="col-sm-9">
                            <input type="number" {...register("batch_size", {...createRules({required: true, min: 1}), valueAsNumber: true})} className="form-control"/>
                            <small className="text-danger">{errors.batch_size?.message}</small>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-sm-3 col-form-label">Clip range</label>
                        <div className="col-sm-9">
                            <input type="number" {...register("clip_range", {...createRules({required: true, min: 0}), valueAsNumber: true})} step={1E-10} className="form-control"/>
                        </div>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-primary" type="submit">Submit learner config</button>
                        <button className="btn btn-danger" type="button" onClick={() => {reset(ppoLearnerConfig); setEditMode(false)}}>Cancel</button>
                    </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">CUDNN Benchmark mode</label>
                            <div className="col-sm-9">
                                <input type="checkbox" {...register("cudnn_benchmark_mode", createRules({required: true}))} className="form-check-input"/>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Device</label>
                            <div className="col-sm-9">
                                <select className="form-select" {...register("device", createRules({required: true}))}>
                                    <option value="cpu">CPU</option>
                                    <option value="cuda">CUDA</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Data type</label>
                            <div className="col-sm-9">
                                <select className="form-select" {...register("dtype", createRules({required: true}))}>
                                    <option value="float32">Float (32-bit)</option>
                                    <option value="float64">Float (64-bit)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Entropy coefficient</label>
                            <div className="col-sm-9">
                                <input type="number" {...register("ent_coef", {...createRules({required: true, min: 0}), valueAsNumber: true})} step={1E-10} className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Number of epochs</label>
                            <div className="col-sm-9">
                                <input type="number" {...register("n_epochs", {...createRules({required: true, min: 1}), valueAsNumber: true})} className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label className="col-sm-3 col-form-label">Number of mini batches</label>
                            <div className="col-sm-9">
                                <input type="number" {...register("n_minibatches", {...createRules({required: true, min: 1}), valueAsNumber: true})} className="form-control"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="border m-3 p-2">
            <div className="d-flex">
                <h3>Learner</h3>
                <button className="btn btn-dark" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill"></i></button>
            </div>
            
            <div><pre>{JSON.stringify(ppoLearnerConfig, null, 2) }</pre></div>
        </div>
        
    )
}

export default PPOLearnerConfigEditor
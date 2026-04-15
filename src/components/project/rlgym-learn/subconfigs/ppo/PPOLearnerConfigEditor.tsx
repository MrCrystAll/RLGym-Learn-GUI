import { useState } from "react";
import type { PPOLearnerConfigModel } from "../../../../../models/rlgym-learn/api";

interface PPOLearnerConfigEditorArgs{
    ppoLearnerConfig: PPOLearnerConfigModel
    setPPOLearnerConfig: (config: PPOLearnerConfigModel) => void
    agentKey: string
}

function PPOLearnerConfigEditor({ppoLearnerConfig, setPPOLearnerConfig, agentKey}: PPOLearnerConfigEditorArgs) {
    const [editMode, setEditMode] = useState(false);


    const onSubmit = (formData: FormData) => {
        setEditMode(false);
    }

    if(editMode){
        return (
            <div className="border m-3 p-3">
                <p className="display-5">"{agentKey}" (PPO) Learner options</p>
                <hr/>
                <form action={onSubmit} className="d-flex justify-content-between">
                <div className="col-5">
                    <div className="form-group mb-3 row">
                        <label htmlFor="actorLR" className="col-sm-3 col-form-label">Actor LR</label>
                        <div className="col-sm-9">
                            <input type="number" step={0.0000001} name="actorLR" className="form-control" id="actorLR" defaultValue={
                                ppoLearnerConfig.actor_lr
                            }/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="criticLR" className="col-sm-3 col-form-label">Critic LR</label>
                        <div className="col-sm-9">
                            <input type="number" step={1E-9} name="criticLR" className="form-control" id="criticLR" defaultValue={
                                ppoLearnerConfig.critic_lr
                            }/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="advantageNorm" className="col-sm-3 col-form-label">Normalize advantages?</label>
                        <div className="col-sm-9">
                            <input type="checkbox" name="advantageNorm" className="form-check-input" id="advantageNorm" defaultChecked={
                                ppoLearnerConfig.advantage_normalization
                            }/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="batchSize" className="col-sm-3 col-form-label">Batch size</label>
                        <div className="col-sm-9">
                            <input type="number" name="batchSize" className="form-control" id="batchSize" defaultValue={
                                ppoLearnerConfig.batch_size
                            }/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="clipRange" className="col-sm-3 col-form-label">Clip range</label>
                        <div className="col-sm-9">
                            <input type="number" name="clipRange" step={1E-10} className="form-control" id="clipRange" defaultValue={
                                ppoLearnerConfig.clip_range
                            }/>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit learner config</button>
                    </div>
                    <div className="col-5">
                        <div className="form-group mb-3 row">
                            <label htmlFor="cudnn" className="col-sm-3 col-form-label">CUDNN Benchmark mode</label>
                            <div className="col-sm-9">
                                <input type="checkbox" name="cudnn" className="form-check-input" id="cudnn" defaultChecked={
                                ppoLearnerConfig.cudnn_benchmark_mode
                            }/>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="device" className="col-sm-3 col-form-label">Device</label>
                            <div className="col-sm-9">
                                <select className="form-select" name="device" id="device">
                                    <option value="cpu">CPU</option>
                                    <option value="cuda">CUDA</option>
                                    <option value="auto" selected>Auto</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mb-3 row">
                            <label htmlFor="dtype" className="col-sm-3 col-form-label">Data type</label>
                            <div className="col-sm-9">
                                <select className="form-select" name="dtype" id="dtype">
                                    <option value="float32" selected>Float (32-bit)</option>
                                    <option value="float64">Float (64-bit)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="entCoef" className="col-sm-3 col-form-label">Entropy coefficient</label>
                            <div className="col-sm-9">
                                <input type="number" name="entCoef" step={1E-10} className="form-control" id="entCoef" defaultValue={
                                    ppoLearnerConfig.ent_coef
                                }/>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="nEpochs" className="col-sm-3 col-form-label">Number of epochs</label>
                            <div className="col-sm-9">
                                <input type="number" name="nEpochs" className="form-control" id="nEpochs" defaultValue={
                                    ppoLearnerConfig.n_epochs   
                                }/>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="nMinibatches" className="col-sm-3 col-form-label">Number of mini batches</label>
                            <div className="col-sm-9">
                                <input type="number" name="nMinibatches" className="form-control" id="nMinibatches" defaultValue={
                                    ppoLearnerConfig.n_minibatches   
                                }/>
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
            
            <p className="text-break">{JSON.stringify(ppoLearnerConfig)}</p>
        </div>
        
    )
}

export default PPOLearnerConfigEditor
import { useState } from "react";
import type { PPOAgentControllerConfigModel, PPOLearnerConfigModel } from "../../../../../models/rlgym-learn/api"
import PPOLearnerConfigEditor from "./PPOLearnerConfigEditor";

interface PPOConfigEditorArgs{
    ppoConfig: () => PPOAgentControllerConfigModel
    setPPOConfig: (model: PPOAgentControllerConfigModel) => void
    agentKey: string
}

function PPOConfigEditor({ppoConfig, setPPOConfig, agentKey}: PPOConfigEditorArgs){

    const [editMode, setEditMode] = useState(false);
    
    const onSubmit = (formData: FormData) => {
        const modifiedPPOConfig: PPOAgentControllerConfigModel = {
            add_unix_timestamp: true,
            experience_buffer_config: {
                device: "auto",
                max_size: 100_000,
                save_experience_buffer_in_checkpoint: true,
                trajectory_processor_config: {}
            },
            learner_config: {
                actor_lr: 3e-4,
                advantage_normalization: true,
                batch_size: 50_000,
                clip_range: 0.2,
                critic_lr: 3e-4,
                cudnn_benchmark_mode: true,
                device: "auto",
                dtype: "float32",
                ent_coef: 0.005,
                n_epochs: 1,
                n_minibatches: 1
            },
            metrics_logger_config: {},
            n_checkpoints_to_keep: 5,
            random_seed: 123,
            run_name: "rlgym-learn-run",
            save_every_ts: 1_000_000,
            save_mid_iteration_data_in_checkpoint: true,
            timesteps_per_iteration: 50_000,
            type: "ppo",
            checkpoint_load_folder: undefined
        }

        setPPOConfig(modifiedPPOConfig)
        setEditMode(false);
    }

    const ppoLearnerConfig = () => {
        return ppoConfig().learner_config;
    }

    const setPPOLearnerConfig = (model: PPOLearnerConfigModel) => {
        setPPOConfig({
            ...ppoConfig(),
            learner_config: model
        })
    }

    const configFields = () => {
        if(editMode){
            return (
                <>
                    <form action={onSubmit} className="border p-3">
                        <div className="col-6">
                            <p className="display-5">Process config options</p>
                            <hr className="w-75"/>
                            <div className="form-group mb-3 row">
                                <label htmlFor="seed" className="col-sm-3 col-form-label">Min process step per inference</label>
                                <div className="col-sm-6">
                                    <input type="number" name="seed" className="form-control" id="seed" defaultValue={1}/>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Submit PPO config</button>
                    </form>
                </>
            )
        }
        return (
            <div className="border p-2">

                <div className="d-flex">
                    <p className="fw-bold border-bottom w-25">{agentKey}</p>
                    <button className="btn btn-dark" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill"></i></button>
                </div>

                
                <p className="text-break">{JSON.stringify(ppoConfig())}</p>
            </div>
            
        )
    }
    
    return (
        <>
            {configFields()}
            <PPOLearnerConfigEditor ppoLearnerConfig={ppoLearnerConfig} setPPOLearnerConfig={setPPOLearnerConfig}></PPOLearnerConfigEditor>
        </>
    )
}

export default PPOConfigEditor
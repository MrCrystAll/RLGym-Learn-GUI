import { useState } from "react";
import type { PPOAgentControllerConfigModel, PPOLearnerConfigModel } from "../../../../../models/rlgym-learn/api"
import PPOLearnerConfigEditor from "./PPOLearnerConfigEditor";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createRules } from "../../../../../models/validators";

interface PPOConfigEditorArgs{
    ppoConfig: PPOAgentControllerConfigModel
    setPPOConfig: (model: PPOAgentControllerConfigModel) => void
    agentKey: string
    deleteAgent: (agent: string) => void
}

function PPOConfigEditor({ppoConfig, setPPOConfig, agentKey, deleteAgent}: PPOConfigEditorArgs){

    const [editMode, setEditMode] = useState(false);
    const [checkpointLoadFolder, setCheckpointLoadFolder] = useState<string | null>(ppoConfig?.checkpoint_load_folder === undefined ? null : ppoConfig.checkpoint_load_folder);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<PPOAgentControllerConfigModel>({
        defaultValues: ppoConfig
    })

    const onSubmit: SubmitHandler<PPOAgentControllerConfigModel> = (data) => {

        const finalData: PPOAgentControllerConfigModel = {
            ...data,
            checkpoint_load_folder: checkpointLoadFolder,
            learner_config: ppoConfig.learner_config,
            experience_buffer_config: ppoConfig.experience_buffer_config
        }

        setPPOConfig(finalData);
        setEditMode(false);
    }

    const onCancel = () => {
        reset(ppoConfig);
        setCheckpointLoadFolder(checkpointLoadFolder);
        setEditMode(false);
    }

    const setPPOLearnerConfig = (model: PPOLearnerConfigModel) => {
        setPPOConfig({
            ...ppoConfig,
            learner_config: model
        })
    }

    const getCheckpointFolder = () => {
        window.api.openFolderPathDialog().then(
            (result: string[] | undefined) => {
                if(result === undefined) return;
                setCheckpointLoadFolder(result[0]);
            }
        )
    }

    const configFields = () => {
        if(editMode){
            return (
                <div className="p-3">
                    <p className="display-5">"{agentKey}" (PPO) config options</p>
                    <hr/>
                    <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-between">
                        <div className="col-5">
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Timesteps per iteration</label>
                                <div className="col-sm-9">
                                    <input type="number" {...register("timesteps_per_iteration", {...createRules({required: true, min: 1}), valueAsNumber: true})} className="form-control"/>
                                    <small className="text-danger">{errors.timesteps_per_iteration?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Save every</label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" {...register("save_every_ts", {...createRules({required: true, min: 0}), valueAsNumber: true})}/>
                                    <small className="text-danger">{errors.save_every_ts?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Run suffix</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" {...register("run_suffix", {...createRules({required: true})})}/>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button className="btn btn-primary" type="submit">Submit PPO config</button>
                                <button className="btn btn-danger" type="button" onClick={onCancel}>Cancel</button>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Checkpoint load folder</label>
                                <div className="col-sm-9 d-flex">
                                    <button className="btn btn-dark" onClick={getCheckpointFolder} type="button"><i className="bi bi-folder"></i></button>
                                    <p className="align-content-center text-break">{checkpointLoadFolder === undefined ? "(Optional)" : checkpointLoadFolder}</p>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Checkpoints to keep</label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" {...register(
                                        "n_checkpoints_to_keep",
                                        {...createRules({required: true, min: 0}), valueAsNumber: true}
                                    )}/>
                                    <small className="text-danger">{errors.n_checkpoints_to_keep?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Random seed</label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" {...register(
                                        "random_seed",
                                        {...createRules({required: true}), valueAsNumber: true}
                                    )}/>
                                    <small className="text-danger">{errors.random_seed?.message}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Save mid iteration data in checkpoint</label>
                                <div className="col-sm-9">
                                    <input type="checkbox" className="form-check-input"/>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-sm-3 col-form-label">Run name</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" {...register(
                                        "run_name",
                                        createRules({required: true})
                                    )}/>
                                    <small className="text-danger">{errors.run_name?.message}</small>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            )
        }
        return (
            <div className="p-2">

                <div className="d-flex">
                    <p className="fw-bold border-bottom w-25">{agentKey}</p>
                    <button className="btn btn-dark" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill"></i></button>
                    <button className="btn btn-danger" onClick={() => deleteAgent(agentKey)}><i className="bi bi-x"></i></button>
                </div>

                <div><pre>{JSON.stringify(ppoConfig, null, 2) }</pre></div>
            </div>
            
        )
    }
    
    return (
        <div className="border">
            {configFields()}
            <PPOLearnerConfigEditor agentKey={agentKey} ppoLearnerConfig={ppoConfig.learner_config} setPPOLearnerConfig={setPPOLearnerConfig}></PPOLearnerConfigEditor>
        </div>
    )
}

export default PPOConfigEditor
import { useState } from "react";
import type { PPOAgentControllerConfigModel, PPOLearnerConfigModel } from "../../../../../models/rlgym-learn/api"
import PPOLearnerConfigEditor from "./PPOLearnerConfigEditor";

interface PPOConfigEditorArgs{
    ppoConfig: PPOAgentControllerConfigModel
    setPPOConfig: (model: PPOAgentControllerConfigModel) => void
    agentKey: string
    deleteAgent: (agent: string) => void
}

function PPOConfigEditor({ppoConfig, setPPOConfig, agentKey, deleteAgent}: PPOConfigEditorArgs){

    const [editMode, setEditMode] = useState(false);
    const [checkpointLoadFolder, setCheckpointLoadFolder] = useState<string>();

    const [tsPerIterError, setTsPerIterError] = useState("");
    const [saveEveryError, setSaveEveryError] = useState("");
    const [nCheckToKeepError, setNCheckToKeepError] = useState("");
    const [seedError, setSeedError] = useState("");
    const [runNameError, setRunNameError] = useState("");

    const tsPerIterValidator = (tsPerIter: number) => {
        if(Number.isNaN(tsPerIter)){
            setTsPerIterError("The value must be a valid number");
            return false;
        }
        if(tsPerIter <= 0){
            setTsPerIterError("The value must be superior to 0");
            return false;
        }
        return true;
    }

    const saveEveryValidator = (saveEvery: number) => {
        if(Number.isNaN(saveEvery)){
            setSaveEveryError("The value must be a valid number");
            return false;
        }
        if(saveEvery <= 0){
            setSaveEveryError("The value must be superior to 0");
            return false;
        }
        return true;
    }

    const nCheckValidator = (nCheck: number) => {
        if(Number.isNaN(nCheck)){
            setNCheckToKeepError("The value must be a valid number");
            return false;
        }
        if(nCheck <= 0){
            setNCheckToKeepError("The value must be superior to 0");
            return false;
        }
        return true;
    }

    const seedValidator = (seed: number) => {
        if(Number.isNaN(seed)){
            setSeedError("The value must be a valid number");
            return false;
        }
        if(seed <= 0){
            setSeedError("The value must be superior to 0");
            return false;
        }
        return true;
    }

    const runNameValidator = (runName: string | undefined) => {
        if(runName === undefined || runName.trim().length === 0){
            setRunNameError("This value must be at least 1 character long");
            return false;
        }
        return true;
    }
    
    const onSubmit = (formData: FormData) => {
        let nErrors = 0;

        const tsPerIter: number  = Number.parseInt(formData.get("tsPerIter")!.toString());
        const saveEvery: number  = Number.parseInt(formData.get("saveEvery")!.toString());

        // This value has no validators because it can't be undefined or any non boolean value
        const unixTs: boolean = formData.get("unixTs") === "on";

        const nCheckToKeep: number = Number.parseInt(formData.get("nCheckToKeep")!.toString());
        const seed: number = Number.parseInt(formData.get("seed")!.toString());

        const saveMidIterationData: boolean = formData.get("saveMidIterationData") === "on";

        const runName: string | undefined = formData.get("runName")?.toString();

        nErrors += tsPerIterValidator(tsPerIter) ? 0 : 1;
        nErrors += saveEveryValidator(saveEvery) ? 0 : 1;
        nErrors += nCheckValidator(nCheckToKeep) ? 0 : 1;
        nErrors += seedValidator(seed) ? 0 : 1;
        nErrors += runNameValidator(runName) ? 0 : 1;

        if(nErrors > 0) return;

        setTsPerIterError("");
        setSaveEveryError("");
        setNCheckToKeepError("");
        setSeedError("");
        setRunNameError("");
        

        const modifiedConfig: PPOAgentControllerConfigModel = {
            learner_config: ppoConfig.learner_config,
            experience_buffer_config: ppoConfig.experience_buffer_config,
            timesteps_per_iteration: tsPerIter,
            save_every_ts: saveEvery,
            add_unix_timestamp: unixTs,
            checkpoint_load_folder: checkpointLoadFolder,
            n_checkpoints_to_keep: nCheckToKeep,
            save_mid_iteration_data_in_checkpoint: saveMidIterationData,
            random_seed: seed,
            run_name: runName!, // Doing "!" because the validator ensured that this value is not undefined
            type: "ppo",
            metrics_logger_config: {} // TODO: Do the metric logger
        }

        setPPOConfig(modifiedConfig);
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
                    <form action={onSubmit} className="d-flex justify-content-between">
                        <div className="col-5">
                            <div className="form-group mb-3 row">
                                <label htmlFor="tsPerIter" className="col-sm-3 col-form-label">Timesteps per iteration</label>
                                <div className="col-sm-9">
                                    <input type="number" name="tsPerIter" className="form-control" id="tsPerIter" defaultValue={
                                        ppoConfig.timesteps_per_iteration
                                    }/>
                                    <small className="text-danger">{tsPerIterError}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label htmlFor="saveEvery" className="col-sm-3 col-form-label">Save every</label>
                                <div className="col-sm-9">
                                    <input type="number" name="saveEvery" className="form-control" id="saveEvery" defaultValue={
                                        ppoConfig.save_every_ts
                                    }/>
                                    <small className="text-danger">{saveEveryError}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label htmlFor="unixTs" className="col-sm-3 col-form-label">Unix timestamp</label>
                                <div className="col-sm-9">
                                    <input type="checkbox" name="unixTs" className="form-check-input" id="unixTs" defaultChecked={
                                        ppoConfig.add_unix_timestamp
                                    }/>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit PPO config</button>
                        </div>
                        <div className="col-5">
                            <div className="form-group mb-3 row">
                                <label htmlFor="loadFolder" className="col-sm-3 col-form-label">Checkpoint load folder</label>
                                <div className="col-sm-9 d-flex">
                                    <button className="btn btn-dark" onClick={getCheckpointFolder} type="button"><i className="bi bi-folder"></i></button>
                                    <p className="align-content-center text-break">{checkpointLoadFolder === undefined ? "(Optional)" : checkpointLoadFolder}</p>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label htmlFor="nCheckToKeep" className="col-sm-3 col-form-label">Checkpoints to keep</label>
                                <div className="col-sm-9">
                                    <input type="number" name="nCheckToKeep" className="form-control" id="nCheckToKeep" defaultValue={
                                        ppoConfig.n_checkpoints_to_keep
                                    }/>
                                    <small className="text-danger">{nCheckToKeepError}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label htmlFor="seed" className="col-sm-3 col-form-label">Random seed</label>
                                <div className="col-sm-9">
                                    <input type="number" name="seed" className="form-control" id="seed" defaultValue={
                                        ppoConfig.random_seed
                                    }/>
                                    <small className="text-danger">{seedError}</small>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label htmlFor="saveMidIterationData" className="col-sm-3 col-form-label">Save mid iteration data in checkpoint</label>
                                <div className="col-sm-9">
                                    <input type="checkbox" name="saveMidIterationData" className="form-check-input" id="saveMidIterationData" defaultChecked={
                                        ppoConfig.save_mid_iteration_data_in_checkpoint
                                    }/>
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label htmlFor="runName" className="col-sm-3 col-form-label">Run name</label>
                                <div className="col-sm-9">
                                    <input type="text" name="runName" className="form-control" id="runName" defaultValue={
                                        ppoConfig.run_name
                                    }/>
                                    <small className="text-danger">{runNameError}</small>
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

                
                <p className="text-break">{JSON.stringify(ppoConfig)}</p>
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
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
    
    const onSubmit = (formData: FormData) => {
        setEditMode(false);
    }

    const setPPOLearnerConfig = (model: PPOLearnerConfigModel) => {
        setPPOConfig({
            ...ppoConfig,
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
                    <button className="btn btn-danger" onClick={() => deleteAgent(agentKey)}><i className="bi bi-x"></i></button>
                </div>

                
                <p className="text-break">{JSON.stringify(ppoConfig)}</p>
            </div>
            
        )
    }
    
    return (
        <>
            {configFields()}
            <PPOLearnerConfigEditor ppoLearnerConfig={ppoConfig.learner_config} setPPOLearnerConfig={setPPOLearnerConfig}></PPOLearnerConfigEditor>
        </>
    )
}

export default PPOConfigEditor
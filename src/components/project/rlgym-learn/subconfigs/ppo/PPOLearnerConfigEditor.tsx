import { useState } from "react";
import type { PPOLearnerConfigModel } from "../../../../../models/rlgym-learn/api";

interface PPOLearnerConfigEditorArgs{
    ppoLearnerConfig: () => PPOLearnerConfigModel
    setPPOLearnerConfig: (config: PPOLearnerConfigModel) => void
}

function PPOLearnerConfigEditor({ppoLearnerConfig, setPPOLearnerConfig}: PPOLearnerConfigEditorArgs) {
    const [editMode, setEditMode] = useState(false);


    const onSubmit = (formData: FormData) => {
        
    }

    if(editMode){
        return (
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
        )
    }
    return (
        <div className="border p-2">
            <p className="text-break">{JSON.stringify(ppoLearnerConfig())}</p>
        </div>
        
    )
}

export default PPOLearnerConfigEditor
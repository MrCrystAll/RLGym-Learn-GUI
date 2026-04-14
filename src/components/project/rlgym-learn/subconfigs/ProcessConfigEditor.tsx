import { useState } from "react";
import type { ProcessConfigModel } from "../../../../models/rlgym-learn/api";

export interface ProcessConfigModelEditorArgs{
    processConfig: ProcessConfigModel
    setProcessConfig: (model: ProcessConfigModel) => void
}

function ProcessConfigEditor({processConfig, setProcessConfig}:ProcessConfigModelEditorArgs) {
    const [editMode, setEditMode] = useState(false);

    const [minProcInferenceError, setMinProcInferenceError] = useState("");
    const [nProcError, setNProcError] = useState("");
    const [renderDelayError, setRenderDelayError] = useState("");

    const minProcInferenceValidator = (minProcInference: number) => {
       //Format validation
        if(Number.isNaN(minProcInference)){
            setMinProcInferenceError("Please enter a valid number");
            return false;
        }
        else if(minProcInference <= 0){
            setMinProcInferenceError("This value must be positive and superior to 0");
            return false;
        }
        return true;
    }

    const nProcValidator = (nProc: number) => {
        if(Number.isNaN(nProc)){
            setNProcError("Please enter a valid number");
            return false;
        }
        else if(nProc <= 0){
            setNProcError("This value must be positive and superior to 0");
            return false;
        }
        return true;
    }

    const renderDelayValidator = (renderDelay: number) => {
        if(Number.isNaN(renderDelay)){
            setRenderDelayError("Please enter a valid number");
            return false;
        }
        else if(renderDelay < 0){
            setRenderDelayError("This value must be positive and superior or equal 0");
            return false;
        }
        return true;
    }

    const coreValidator = (model: ProcessConfigModel) => {
        if(model.min_process_steps_per_inference > model.n_proc){
            setMinProcInferenceError("This value must be inferior or equal to the number of processes");
            return false;
        }
        return true;
    }
    
    const onSubmit = (formData: FormData) => {
        const minProcInference: number = Number.parseInt(formData.get("minProcInference")!.toString());
        const nProc: number = Number.parseInt(formData.get("nProc")!.toString());
        const recalc: boolean = formData.get("recalc")?.toString() === "on"
        const render: boolean = formData.get("render")?.toString() === "on"
        const render_delay: number = Number.parseFloat(formData.get("render_delay")!.toString());
        const delay_launch: number = Number.parseFloat(formData.get("delay_launch")!.toString());

        let nErrors = 0;
        
        //Format validation
        nErrors += minProcInferenceValidator(minProcInference) ? 0 : 1
        nErrors += nProcValidator(nProc) ? 0 : 1
        nErrors += renderDelayValidator(render_delay) ? 0 : 1

        if(nErrors > 0){
            return;
        }

        const modifiedProcessConfig: ProcessConfigModel = {
            min_process_steps_per_inference: minProcInference,
            n_proc: nProc,
            recalculate_agent_id_every_step: recalc,
            render: render,
            render_delay: render_delay,
            instance_launch_delay: delay_launch
        }

        if(!coreValidator(modifiedProcessConfig)){
            return;
        }

        setMinProcInferenceError("");
        setNProcError("");
        setRenderDelayError("");
        
        setProcessConfig(modifiedProcessConfig);
        setEditMode(false);
        
    }

    if(editMode){
        return (
            <form action={onSubmit} className="border p-3">
                <div className="col-6">
                    <p className="display-5">Process config options</p>
                    <hr className="w-75"/>
                    <div className="form-group mb-3 row">
                        <label htmlFor="minProcInference" className="col-sm-3 col-form-label">Min process step per inference</label>
                        <div className="col-sm-6">
                            <input type="number" name="minProcInference" className="form-control" id="minProcInference" defaultValue={
                                processConfig.min_process_steps_per_inference
                            }/>
                            <small className="text-danger">{minProcInferenceError}</small>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="nProc" className="col-sm-3 col-form-label">Number of processes</label>
                        <div className="col-sm-6">
                            <input type="number" className="form-control" name="nProc" id="nProc" defaultValue={
                                processConfig.n_proc
                            }/>
                            <small className="text-danger">{nProcError}</small>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="recalc" className="col-sm-3 col-form-label">Recalculate agents every step</label>
                        <div className="col-sm-6">
                            <input type="checkbox" className="form-check-input" name="recalc" id="recalc" defaultChecked={
                                processConfig.recalculate_agent_id_every_step
                            }/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="render" className="col-sm-3 col-form-label">Render</label>
                        <div className="col-sm-6">
                            <input type="checkbox" className="form-check-input" name="render" id="render" defaultChecked={
                                processConfig.render
                            }/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="render_delay" className="col-sm-3 col-form-label">Render delay</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" name="render_delay" id="render_delay" defaultValue={
                                processConfig.render_delay
                            }/>
                            <small className="text-danger">{renderDelayError}</small>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="delay_launch" className="col-sm-3 col-form-label">Instance delay between launches</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" name="delay_launch" id="delay_launch" defaultValue={
                                (processConfig.instance_launch_delay === undefined ? 0 : processConfig.instance_launch_delay)?.toString()
                            }/>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary">Submit process config</button>
            </form>
        )
    }

    return (
        <>
        <div className="d-flex">
            <p className="display-6">Process config</p>
            <button className="btn btn-dark float-end" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill"></i></button>
        </div>
            

            <p>{JSON.stringify(processConfig)}</p>
        </>
    )
}

export default ProcessConfigEditor
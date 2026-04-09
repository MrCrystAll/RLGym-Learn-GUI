import type { ProcessConfigModel } from "../../../../models/rlgym-learn/api";

export interface ProcessConfigModelEditorArgs{
    processConfig: ProcessConfigModel | undefined
    setProcessConfig: (model: ProcessConfigModel) => void
}

function ProcessConfigEditor({processConfig, setProcessConfig}:ProcessConfigModelEditorArgs) {
    const onSubmit = (formData: FormData) => {
        const modifiedProcessConfig: ProcessConfigModel = {
            min_process_steps_per_inference: 1,
            n_proc: 1,
            recalculate_agent_id_every_step: true,
            render: false,
            render_delay: 0,
            instance_launch_delay: 0
        }
        
        setProcessConfig(modifiedProcessConfig);
        
    }

    if(processConfig === undefined){
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
                    <div className="form-group mb-3 row">
                        <label htmlFor="flinksFolder" className="col-sm-3 col-form-label">Number of processes</label>
                        <div className="col-sm-6">
                            <input type="number" className="form-control" name="flinks_folder" id="flinksFolder" defaultValue={8}/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="shMemSize" className="col-sm-3 col-form-label">Recalculate agents every step</label>
                        <div className="col-sm-6">
                            <input type="checkbox" className="form-check-input" name="shm_buffer_size" id="shMemSize" defaultChecked={true}/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="render" className="col-sm-3 col-form-label">Render</label>
                        <div className="col-sm-6">
                            <input type="checkbox" className="form-check-input" name="render" id="render" defaultChecked={true}/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="batched_aald" className="col-sm-3 col-form-label">Render delay</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" name="batched_aald" id="batched_aald" defaultValue={8/120}/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label htmlFor="batched_aald" className="col-sm-3 col-form-label">Instance delay between launches</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" name="batched_aald" id="batched_aald" defaultValue={0}/>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary">Submit process config</button>
            </form>
        )
    }

    return (
        <>
            <p className="display-6">Process config</p>
            <p>{JSON.stringify(processConfig)}</p>
        </>
    )
}

export default ProcessConfigEditor
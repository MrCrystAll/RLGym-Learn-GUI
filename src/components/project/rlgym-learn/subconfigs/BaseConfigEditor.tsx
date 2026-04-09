import { useState } from "react";
import { Serde, type BaseConfigModel } from "../../../../models/rlgym-learn/api";

export interface BaseConfigEditorArgs{
    baseConfig: BaseConfigModel | undefined
    setBaseConfig: (model: BaseConfigModel) => void

}

function BaseConfigEditor({baseConfig, setBaseConfig}:BaseConfigEditorArgs) {
    // Base config
    const [seedError, setSeedError] = useState("");
    const [flinksError, setFlinksError] = useState("");
    const [shmemSizeError, setShmemSizeError] = useState("");
    const [tsLimitError, setTsLimitError] = useState("");
    
    const onSubmit = (formData: FormData) => {
        const seed: number = Number.parseInt(formData.get("seed")!.toString());
        const flinks_folder: string | undefined = formData.get("flinks_folder")?.toString()
        const shmemSize: number = Number.parseInt(formData.get("shm_buffer_size")!.toString());
        const tsLimit: number = Number.parseInt(formData.get("timestep_limit")!.toString());
        const batched_aald: boolean = formData.get("batched_aald")?.toString() == "on";

        if(Number.isNaN(seed)){
            setSeedError(`Couldn't parse value ${formData.get("seed")}`)
            return;
        }

        if(flinks_folder === undefined || flinks_folder.trim().length == 0){
            setFlinksError("You need to specify a folder for file links.");
            return;
        }

        if(Number.isNaN(shmemSize)){
            setShmemSizeError(`Couldn't parse value ${formData.get("shm_buffer_size")}`)
            return;
        }

        if(Number.isNaN(tsLimit)){
            setTsLimitError(`Couldn't parse value ${formData.get("timestep_limit")}`)
            return;
        }

        const modifiedBaseConfig: BaseConfigModel = {
            random_seed: seed,
            batched_tensor_action_associated_learning_data: batched_aald,
            serde_types: {
                action_serde_type: Serde.FLOAT(),
                agent_id_serde_type: Serde.FLOAT(),
                obs_serde_type: Serde.FLOAT(),
                action_space_serde_type: Serde.FLOAT(),
                obs_space_serde_type: Serde.FLOAT(),
                reward_serde_type: Serde.FLOAT(),
                shared_info_serde_type: Serde.FLOAT(),
                shared_info_setter_serde_type: Serde.FLOAT(),
                state_serde_type: Serde.FLOAT()
            },
            flinks_folder: flinks_folder,
            shm_buffer_size: shmemSize,
            timestep_limit: tsLimit
        }

        setBaseConfig(modifiedBaseConfig)
    }

    if(baseConfig === undefined){
        return (
            <form action={onSubmit} className="border p-3">
                <div className="d-flex">
                    <div className="col-6">
                        <p className="display-5">Base config options</p>
                        <hr className="w-75"/>
                        <div className="form-group mb-3 row">
                            <label htmlFor="seed" className="col-sm-3 col-form-label">Seed</label>
                            <div className="col-sm-6">
                                <input type="number" name="seed" className="form-control" id="seed" defaultValue={123}/>
                                <small className="text-danger">{seedError}</small>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="flinksFolder" className="col-sm-3 col-form-label">FLinks folder</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" name="flinks_folder" id="flinksFolder" defaultValue={"shmem_flinks"}/>
                                <small className="text-danger">{flinksError}</small>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="shMemSize" className="col-sm-3 col-form-label">Shared memory buffer size</label>
                            <div className="col-sm-6">
                                <input type="number" className="form-control" name="shm_buffer_size" id="shMemSize" defaultValue={8192}/>
                                <small className="text-danger">{shmemSizeError}</small>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="tsLimit" className="col-sm-3 col-form-label">Timestep limit</label>
                            <div className="col-sm-6">
                                <input type="number" className="form-control" name="timestep_limit" id="tsLimit" defaultValue={1_000_000_000}/>
                                <small className="text-danger">{tsLimitError}</small>
                            </div>
                        </div>
                        <div className="form-group mb-3 row">
                            <label htmlFor="batched_aald" className="col-sm-3 col-form-label">Batched tensor action associated learning data</label>
                            <div className="col-sm-6">
                                <input type="checkbox" className="form-check-input" name="batched_aald" id="batched_aald" defaultChecked={true}/>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <p className="display-5">Serdes config options</p>
                        <hr className="w-75"/>
                        <p>TODO</p>
                    </div>
                </div>

                <button className="btn btn-primary">Submit base config</button>
            </form>
        )
    }

    return (
        <>
            <p className="display-6">Base config</p>

            <p className="text-break">{JSON.stringify(baseConfig)}</p>
        </>
    )
}

export default BaseConfigEditor
import StringField from "../../../config-cards/StringField";
import NumberField from "../../../config-cards/NumberField";
import NumberCard from "../../../config-cards/NumberCard";
import type { BaseConfigModel } from "rlgym-learn-client";

export interface BaseConfigEditorArgs{
    baseConfig: BaseConfigModel
    setBaseConfig: (model: BaseConfigModel) => void

}

function BaseConfigEditor({baseConfig, setBaseConfig}:BaseConfigEditorArgs) {
    return (
        <>
            <div>
                <div className="d-flex">
                    <p className="display-6">Base config</p>
                </div>

                <NumberCard intOnly text="Timestep limit" value={baseConfig.timestep_limit} help="The total amount of timestep to collect before stopping" onChange={(value) => {if(value === null) return; else setBaseConfig({...baseConfig, timestep_limit: value})}}></NumberCard>

                <p className="fw-lighter mt-2">Miscellaneous</p>
                <div className="gray-bg rounded">
                    <StringField value={baseConfig.flinks_folder} help="Folder where the file links are stored" text="File links folder" icon="folder" onChange={(value) => {if(value === null) return; else setBaseConfig({...baseConfig, flinks_folder: value})}} required></StringField>
                    <hr className="mx-2 my-1"></hr>
                    <NumberField value={baseConfig.random_seed} required help="The seed used for the RNG" icon="dice-1" onChange={(value) => {if(value === null) return; else setBaseConfig({...baseConfig, random_seed: value})}} text="Random seed"></NumberField>
                    <hr className="mx-2 my-1"></hr>
                    <NumberField value={baseConfig.shm_buffer_size} required help="The size of the buffer for the shared memory, don't touch unless you have a lot of data to send in the shared memory" icon="box" onChange={(value) => {if(value === null) return; else setBaseConfig({...baseConfig, shm_buffer_size: value})}} text="Shared memory buffer size"></NumberField>
                </div>
            </div>
        </>
    )
}

export default BaseConfigEditor
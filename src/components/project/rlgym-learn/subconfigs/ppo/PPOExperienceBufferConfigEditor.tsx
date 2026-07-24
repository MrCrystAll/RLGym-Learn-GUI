import { ExperienceBufferConfigModelDeviceEnum, type ExperienceBufferConfigModel } from "rlgym-learn-client";
import NumberCard from "../../../../config-cards/NumberCard";
import SelectField from "../../../../config-cards/SelectField";
import ToggleField from "../../../../config-cards/ToggleCard";
import DefaultJSONDescription from "../../../DefaultJSONDescription";

interface PPOExperienceBufferConfigEditorArgs{
    ppoExperienceBufferConfig: ExperienceBufferConfigModel
    setPPOExperienceBufferConfig: (config: ExperienceBufferConfigModel) => void
}

function PPOExperienceBufferConfigEditor({ppoExperienceBufferConfig, setPPOExperienceBufferConfig}: PPOExperienceBufferConfigEditorArgs) {
    return (
        <div>
            <div>
                <p className="display-6">Experience buffer settings</p>
                <div className="mb-3">
                    <div className="d-flex gap-3">
                        <NumberCard text="Max size" value={ppoExperienceBufferConfig.max_size} required help="The maximum size of the experience buffer" icon="arrows-expand-vertical" onChange={(value) => setPPOExperienceBufferConfig({
                        ...ppoExperienceBufferConfig,
                        max_size: value
                    })}></NumberCard>
                    </div>
                </div>

                <div className="gray-bg rounded mb-3">
                    <SelectField defaultValue={ppoExperienceBufferConfig.device} help="The device used by the experience buffer to store its data" icon="cpu" text="Device" values={Object.values(ExperienceBufferConfigModelDeviceEnum)} onChange={(value) => setPPOExperienceBufferConfig({
                        ...ppoExperienceBufferConfig,
                        device: value as ExperienceBufferConfigModelDeviceEnum
                    })}></SelectField>
                    <hr className="mx-2 my-1"></hr>
                    <ToggleField text="Save buffer data in checkpoint" value={ppoExperienceBufferConfig.save_experience_buffer_in_checkpoint} help="Saves the whole experience buffer in the checkpoint. This option makes the checkpoints VERY HEAVY, use at your own risk." icon="save" onToggle={() => setPPOExperienceBufferConfig({
                        ...ppoExperienceBufferConfig,
                        save_experience_buffer_in_checkpoint: !ppoExperienceBufferConfig.save_experience_buffer_in_checkpoint
                    })}></ToggleField>
                </div>

                <DefaultJSONDescription object={ppoExperienceBufferConfig.trajectory_processor_config} updateValue={(key, value) => setPPOExperienceBufferConfig({
                    ...ppoExperienceBufferConfig,
                    trajectory_processor_config: {
                        ...ppoExperienceBufferConfig.trajectory_processor_config,
                        [key]: value
                    }
                })} title="Trajectory process config"></DefaultJSONDescription>
            </div>
        </div>
        
    )
}

export default PPOExperienceBufferConfigEditor
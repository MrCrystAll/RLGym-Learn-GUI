import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createRules } from "../../../../../models/validators";
import type { PPOAgentControllerConfigModel, PPOLearnerConfigModel } from "rlgym-learn-client";
import NumberField from "../../../../config-cards/NumberField";
import ToggleField from "../../../../config-cards/ToggleCard";
import StringField from "../../../../config-cards/StringField";
import PPOLearnerConfigEditor from "./PPOLearnerConfigEditor";
import DefaultJSONDescription from "../../../DefaultJSONDescription";
import PPOExperienceBufferConfigEditor from "./PPOExperienceBufferConfigEditor";

interface PPOConfigEditorArgs{
    ppoConfig: PPOAgentControllerConfigModel
    setPPOConfig: (model: PPOAgentControllerConfigModel) => void
    agentKey: string
    deleteAgent: (agent: string) => void
}

function PPOConfigEditor({ppoConfig, setPPOConfig, agentKey, deleteAgent}: PPOConfigEditorArgs){

    const [checkpointLoadFolder, setCheckpointLoadFolder] = useState<string | null>(ppoConfig?.checkpoint_load_folder === undefined ? null : ppoConfig.checkpoint_load_folder);

    const setPPOLearnerConfig = (config: PPOLearnerConfigModel) => {
        setPPOConfig({
            ...ppoConfig,
            learner_config: config
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
    
    return (
        <div className="d-flex flex-column border p-3 gap-3">
            <div>
                <button className="btn btn-danger float-end" onClick={() => deleteAgent(agentKey)}><i className="bi bi-x"></i></button>
                <p className="display-4">{agentKey}</p>
                <hr></hr>
            </div>
            {/* <DefaultJSONDescription title="PPO Config" object={ppoConfig} updateValue={(key, value) => setPPOConfig({...ppoConfig, [key]: value})}></DefaultJSONDescription> */}
            {/* <PPOLearnerConfigEditor agentKey={agentKey} ppoLearnerConfig={ppoConfig.learner_config} setPPOLearnerConfig={setPPOLearnerConfig}></PPOLearnerConfigEditor> */}
            
            <div className="bg-configuration-card px-3" onClick={getCheckpointFolder} style={{cursor: "pointer"}}>
                <p className="fs-6 fw-lighter mt-3">Checkpoint load folder</p>
                <p className="text-break bg-dark p-2 rounded border" style={{fontFamily: "monospace"}}>{checkpointLoadFolder === null ? "Not specified, click to fetch a checkpoint" : checkpointLoadFolder}</p>
            </div>
            <div>
                <PPOLearnerConfigEditor agentKey={agentKey} ppoLearnerConfig={ppoConfig.learner_config} setPPOLearnerConfig={setPPOLearnerConfig}></PPOLearnerConfigEditor>
            </div>
            <div>
                {/* <DefaultJSONDescription object={ppoConfig.experience_buffer_config} title="Experience buffer" updateValue={(key, value) => setPPOConfig({
                    ...ppoConfig,
                    experience_buffer_config: {
                        ...ppoConfig.experience_buffer_config,
                        [key]: value
                    }
                })}></DefaultJSONDescription> */}
                <PPOExperienceBufferConfigEditor ppoExperienceBufferConfig={ppoConfig.experience_buffer_config} setPPOExperienceBufferConfig={(config) => setPPOConfig({
                    ...ppoConfig,
                    experience_buffer_config: config
                })}></PPOExperienceBufferConfigEditor>
            </div>
            <div>
                <DefaultJSONDescription object={ppoConfig.metrics_logger_config} title="Metrics logger" updateValue={(key, value) => setPPOConfig({
                    ...ppoConfig,
                    metrics_logger_config: {
                        ...ppoConfig.metrics_logger_config,
                        [key]: value
                    }
                })}></DefaultJSONDescription>
            </div>
            <div className="d-flex justify-content-around gap-2 mt-3">
                <div className="flex-fill">
                    <p>Serialization info</p>
                    <div className="bg-configuration-card rounded">
                        <NumberField text="Save every" required value={ppoConfig.save_every_ts} help="Saves the checkpoints every n steps" icon="bookmark-star-fill" onChange={(value) => 
                            setPPOConfig({
                                ...ppoConfig, save_every_ts: value
                            })
                        }></NumberField>
                        <hr className="mx-2 my-1"></hr>
                        <NumberField text="Number of checkpoints to keep" required value={ppoConfig.n_checkpoints_to_keep} help="Number of checkpoints kept in the save folder" icon="life-preserver" onChange={(value) => 
                            setPPOConfig({
                                ...ppoConfig, n_checkpoints_to_keep: value
                            })
                        }></NumberField>
                        <hr className="mx-2 my-1"></hr>
                        <ToggleField text="Save mid iteration data in checkpoint" value={ppoConfig.save_mid_iteration_data_in_checkpoint} help="Whether to save stuff like shared info within the checkpoint, can lead to additional storage used" icon="save" onToggle={() => 
                            setPPOConfig({
                                ...ppoConfig, save_mid_iteration_data_in_checkpoint: !ppoConfig.save_mid_iteration_data_in_checkpoint
                            })
                        }></ToggleField>
                    </div>
                </div>
                <div className="flex-fill">
                        <p>Miscellaneous</p>
                        <div className="bg-configuration-card rounded">
                            <StringField text="Run suffix" required value={ppoConfig.run_suffix} help="When saving, will save within a directory called <run_name><run_suffix>" icon="align-end" onChange={(value) => 
                                setPPOConfig({
                                    ...ppoConfig, run_suffix: value
                                })
                            }></StringField>
                            <hr className="mx-2 my-1"></hr>
                            <NumberField text="Random seed" required value={ppoConfig.random_seed} help="The number used to seed the RNG" icon="dice-3" onChange={(value) => 
                                setPPOConfig({
                                    ...ppoConfig, random_seed: value
                                })
                            }></NumberField>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default PPOConfigEditor
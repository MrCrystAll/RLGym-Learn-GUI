import { useState } from "react"
import { type AgentControllerConfig, type BaseConfigModel, type LearningCoordinatorConfigModel, type ProcessConfigModel } from "../../../models/rlgym-learn/api"
import BaseConfigEditor from "./subconfigs/BaseConfigEditor"
import ProcessConfigEditor from "./subconfigs/ProcessConfigEditor"
import AgentControllersEditor from "./subconfigs/AgentControllersEditor"
import type { PPOAgentControllerConfigModel } from "rlgym-learn-client"
import type { AxiosError } from "axios"
import SerdesConfigEditor from "./subconfigs/serdes/SerdesConfigEditor"

export interface LearningCoordinatorConfigEditorArgs{
    learningCoordinatorConfig: LearningCoordinatorConfigModel
    setLearningCoordinatorConfig: (arg0: LearningCoordinatorConfigModel) => void
    getDefaultConfig: (configType: string) => Promise<PPOAgentControllerConfigModel>
}

enum ConfigType{
    BASE,
    SERDE,
    AGENTS,
    PROCESS
}

const NAMES: Record<ConfigType, string> = {
    [ConfigType.BASE]: "Base config",
    [ConfigType.SERDE]: "Serdes",
    [ConfigType.AGENTS]: "Agents",
    [ConfigType.PROCESS]: "Process config",
}

function LearningCoordinatorConfigEditor({learningCoordinatorConfig, setLearningCoordinatorConfig, getDefaultConfig}: LearningCoordinatorConfigEditorArgs) {
    const [currentConfigType, setCurrentConfigType] = useState<ConfigType>(ConfigType.BASE);

    const setBaseConfigModel = (model: BaseConfigModel) => {setLearningCoordinatorConfig({
        ...learningCoordinatorConfig,
        base_config: model
    })};

    const setProcessConfigModel = (model: ProcessConfigModel) => {
        setLearningCoordinatorConfig({
            ...learningCoordinatorConfig,
            process_config: model
        })
    }

    const setAgentControllersConfigModel = (models: Record<string, AgentControllerConfig>) => {
        setLearningCoordinatorConfig({
            ...learningCoordinatorConfig,
            agent_controllers_config: models
        })
    }

    const setAgentControllerConfigModel = (agent: string, model: AgentControllerConfig) => setAgentControllersConfigModel({
        ...learningCoordinatorConfig?.agent_controllers_config,
        [agent]:  model
    })

    // Agent controllers
    const [error, setError] = useState<string | null>(null);

    const [addingController, setAddingController] = useState(false);

    const onAgentCancel = () => {
        setError(null);
        setAddingController(false)
    }

    const onAgentAddSubmit = (formData: FormData) => {

        const name: string | undefined = formData.get("agentKey")?.toString();
        const type: string = formData.get("type")!.toString();

        if(name === undefined || name.trim().length == 0)
        {
            setError("Expecting a value for agent key but got nothing.");
            return;
        }

        getDefaultConfig(type).then(
            (defaultConfig) => {
                const finalName = type.toUpperCase().concat("-", name);

                if(learningCoordinatorConfig?.agent_controllers_config === undefined){
                    setAgentControllersConfigModel({[finalName]:  defaultConfig})
                }
                else{
                    if(learningCoordinatorConfig?.agent_controllers_config[finalName] !== undefined){
                        setError("Agent key already exists, please choose another one.");
                        return;
                    }
                    else{
                        setAgentControllersConfigModel({
                            ...learningCoordinatorConfig?.agent_controllers_config,
                            [finalName]:  defaultConfig
                        })
                    }
                }

                setAddingController(false);
                setError(null);
            }
        ).catch(
            (reason: AxiosError) => setError(reason.response.data)
        )
    }

    const deleteController = (agent: string) => {
        const object = {...learningCoordinatorConfig?.agent_controllers_config};
        delete object[agent]

        setAgentControllersConfigModel(object);
    }

    const addController = () => {
        if (addingController){
            return (
                <div className="mt-3 border p-3">
                    
                    <p className="display-6">Creating agent controller</p>
                    <form action={onAgentAddSubmit}>
                        <div className="form-group w-25 my-2">
                            <label htmlFor="agentKey">Agent key</label>
                            <input type="text" className="form-control" name="agentKey" id="agentKey"></input>
                            <small className="text-danger">{error}</small>
                        </div>


                        <p>Agent type:</p>
                        <div className="d-flex justify-content-around">
                            <div className="form-group">
                                <label htmlFor="ppo">PPO</label>
                                <input type="radio" name="type" value={"ppo"} className="form-check-input ms-2" id="ppo" defaultChecked={true}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dqn">DQN</label>
                                <input type="radio" name="type" value={"dqn"} className="form-check-input ms-2" id="dqn"></input>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-secondary" type="submit">Add controller</button>
                            <button className="btn btn-danger" type="button" onClick={onAgentCancel}>Cancel</button>
                        </div>
                    </form>
                    
                    <hr/>
                </div>
            )
        }
        else{
            return <button className="btn btn-primary mt-3" onClick={() => setAddingController(true)}>Add a controller</button>
        }
    }

    const render = () => {
        if(learningCoordinatorConfig === undefined){
            return <p>No config</p>
        }
        else{
            switch (+currentConfigType) {
                case ConfigType.BASE:
                    return <BaseConfigEditor baseConfig={learningCoordinatorConfig.base_config} setBaseConfig={setBaseConfigModel}/>
                case ConfigType.SERDE:
                    return <SerdesConfigEditor serdesTypesModel={learningCoordinatorConfig.base_config.serde_types} setSerdesTypesModel={(model) => setBaseConfigModel({...learningCoordinatorConfig.base_config, serde_types: model})}></SerdesConfigEditor>
                case ConfigType.AGENTS:
                    return <div>
                        {addController()}
                        <AgentControllersEditor deleteAgent={deleteController} agentControllersConfigModel={learningCoordinatorConfig.agent_controllers_config} updateControllerConfigModel={setAgentControllerConfigModel}/>
                    </div>
                case ConfigType.PROCESS:
                    return <ProcessConfigEditor processConfig={learningCoordinatorConfig.process_config} setProcessConfig={setProcessConfigModel}></ProcessConfigEditor>
                default:
                    break;
            }
        }
    }

    return (
        <div>
            <div className="d-flex w-100 gap-2 py-2">
                {
                    Object.entries(NAMES).map(([config, value]) => <button className={"btn btn-outline-light flex-fill " + (currentConfigType === config ? "active" : "") } onClick={() => setCurrentConfigType(config)}>{value}</button>)
                }
            </div>

            {render()}
        </div>

    )
}

export default LearningCoordinatorConfigEditor
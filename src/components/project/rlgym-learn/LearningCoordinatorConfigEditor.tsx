import { useState } from "react"
import { type AgentControllerConfig, type BaseConfigModel, type LearningCoordinatorConfigModel, type ProcessConfigModel } from "../../../models/rlgym-learn/api"
import BaseConfigEditor from "./subconfigs/BaseConfigEditor"
import ProcessConfigEditor from "./subconfigs/ProcessConfigEditor"
import AgentControllersEditor from "./subconfigs/AgentControllersEditor"
import { PPO_DEFAULT_CONFIG } from "./subconfigs/ppo/default_config"

export interface LearningCoordinatorConfigEditorArgs{
    learningCoordinatorConfig: () => LearningCoordinatorConfigModel | undefined
    setLearningCoordinatorConfig: (arg0: LearningCoordinatorConfigModel) => void
}

function LearningCoordinatorConfigEditor({learningCoordinatorConfig, setLearningCoordinatorConfig}: LearningCoordinatorConfigEditorArgs) {
    const baseConfigModel = () => learningCoordinatorConfig().base_config;
    const setBaseConfigModel = (model: BaseConfigModel) => {setLearningCoordinatorConfig({
        ...learningCoordinatorConfig(),
        base_config: model
    })};

    const processConfigModel = () => learningCoordinatorConfig().process_config;
    const setProcessConfigModel = (model: ProcessConfigModel) => {
        setLearningCoordinatorConfig({
            ...learningCoordinatorConfig(),
            process_config: model
        })
    }

    const agentControllersConfigModel = () => learningCoordinatorConfig().agent_controllers_config;
    const setAgentControllersConfigModel = (models: Record<string, AgentControllerConfig>) => {
        setLearningCoordinatorConfig({
            ...learningCoordinatorConfig(),
            agent_controllers_config: models
        })
    }

    const setAgentControllerConfigModel = (agent: string, model: AgentControllerConfig) => setAgentControllersConfigModel({
        ...agentControllersConfigModel(),
        [agent]: model
    })

    // Agent controllers
    const [agentKeyError, setAgentKeyError] = useState("");

    const [addingController, setAddingController] = useState(false);

    const onAgentAddSubmit = (formData: FormData) => {

        const name: string | undefined = formData.get("agentKey")?.toString();
        const type: string = formData.get("type")!.toString();

        if(name === undefined || name.trim().length == 0)
        {
            setAgentKeyError("Expecting a value for agent key but got nothing.");
            return;
        }

        const model = type === "ppo" ? PPO_DEFAULT_CONFIG : {
            type: "unknown"
        }

        if(agentControllersConfigModel() === undefined){
            setAgentControllersConfigModel({[name]: model})
        }
        else{
            if(agentControllersConfigModel()[name] !== undefined){
                setAgentKeyError("Agent key already exists, please choose another one.");
                return;
            }
            else{
                setAgentControllersConfigModel({
                    ...agentControllersConfigModel(),
                    [name]: model
                })
            }
        }

        setAddingController(false);
    }

    const addController = () => {
        if (addingController){
            return (
                <>
                    <hr/>
                    
                    <p className="display-6">Creating agent controller</p>
                    <form action={onAgentAddSubmit}>
                        <div className="form-group w-25 my-2">
                            <label htmlFor="agentKey">Agent key</label>
                            <input type="text" className="form-control" name="agentKey" id="agentKey"></input>
                            <small className="text-danger">{agentKeyError}</small>
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
                        <button className="btn btn-secondary" type="submit">Add controller</button>
                    </form>
                    
                    <hr/>
                </>
            )
        }
        else{
            return <button className="btn btn-primary" onClick={() => setAddingController(true)}>Add a controller</button>
        }
    }

    const render = () => {
        if(learningCoordinatorConfig() === undefined){
            return <p>No config</p>
        }
        else{
            return <>
            {addController()}

            <div>
                <BaseConfigEditor baseConfig={baseConfigModel} setBaseConfig={setBaseConfigModel}/>
                <ProcessConfigEditor processConfig={processConfigModel} setProcessConfig={setProcessConfigModel}/>
                <AgentControllersEditor agentControllersConfigModel={agentControllersConfigModel} updateControllerConfigModel={setAgentControllerConfigModel}/>
                <button className="btn btn-success w-100" type="submit">Submit</button>
            </div>
            </>
        }
    }

    return (
        <>
            {render()}
        </>

    )
}

export default LearningCoordinatorConfigEditor
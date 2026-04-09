import { useEffect, useState } from "react"
import { type AgentControllerConfig, type LearningCoordinatorConfigModel } from "../../../models/rlgym-learn/api"
import BaseConfigEditor from "./subconfigs/BaseConfigEditor"
import ProcessConfigEditor from "./subconfigs/ProcessConfigEditor"
import AgentControllersEditor from "./subconfigs/AgentControllersEditor"

export interface LearningCoordinatorConfigEditorArgs{
    learningCoordinatorConfig: LearningCoordinatorConfigModel | undefined
    setLearningCoordinatorConfig: (arg0: LearningCoordinatorConfigModel) => void
}

function LearningCoordinatorConfigEditor({learningCoordinatorConfig, setLearningCoordinatorConfig}: LearningCoordinatorConfigEditorArgs) {

    const [baseConfigModel, setBaseConfigModel] = useState(learningCoordinatorConfig?.base_config)
    const [processConfigModel, setProcessConfigModel] = useState(learningCoordinatorConfig?.process_config)
    const [agentControllersConfigModel, setAgentControllersConfigModel] = useState<Record<string, AgentControllerConfig | undefined>>(learningCoordinatorConfig?.agent_controllers_config === undefined ? {} : learningCoordinatorConfig.agent_controllers_config)
    const [agentControllersEditorInput, setAgentControllersEditorInput] = useState<Record<string, string>>({});

    // Agent controllers
    const [agentKeyError, setAgentKeyError] = useState("");

    const [addingController, setAddingController] = useState(false);

    useEffect(() => {
        if(baseConfigModel === undefined) return;
        if(processConfigModel === undefined) return;
        if(agentControllersConfigModel === undefined) return;

        let validAgentControllerConfig = true;

        Object.values(agentControllersConfigModel).forEach(
            (value: AgentControllerConfig | undefined) => validAgentControllerConfig = value !== undefined
        )

        if(!validAgentControllerConfig) return;

        setLearningCoordinatorConfig(
            {
                base_config: baseConfigModel,
                agent_controllers_config: agentControllersConfigModel,
                agent_controllers_save_folder: "Test",
                process_config: processConfigModel
            }
        )

    }, [baseConfigModel, processConfigModel, agentControllersConfigModel])

    const onAgentAddSubmit = (formData: FormData) => {

        const name: string | undefined = formData.get("agentKey")?.toString();
        const type: string = formData.get("type")!.toString();

        if(name === undefined || name.trim().length == 0)
        {
            setAgentKeyError("Expecting a value for agent key but got nothing.");
            return;
        }

        if(agentControllersEditorInput === undefined){
            setAgentControllersEditorInput({[name]: type})
        }
        else{
            if(agentControllersEditorInput[name] !== undefined){
                setAgentKeyError("Agent key already exists, please choose another one.");
                return;
            }
            else{
                setAgentControllersEditorInput({
                    ...agentControllersEditorInput,
                    [name]: type
                })
            }
        }

        setAgentControllersConfigModel({
            ...agentControllersConfigModel,
            [name]: undefined
        })

        setAddingController(false);
    }

    const updateControllerConfigModel = (name: string, model: AgentControllerConfig) => {
        setAgentControllersConfigModel(
            {...agentControllersConfigModel, [name]: model}
        )
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

    return (
        <>
            {addController()}

            <div>
                <BaseConfigEditor baseConfig={baseConfigModel} setBaseConfig={setBaseConfigModel}/>
                <ProcessConfigEditor processConfig={processConfigModel} setProcessConfig={setProcessConfigModel}/>
                <AgentControllersEditor agentControllersConfigModel={agentControllersConfigModel} agentControllerInput={agentControllersEditorInput} updateControllerConfigModel={updateControllerConfigModel}/>
                <button className="btn btn-success w-100" type="submit">Submit</button>
            </div>
        </>

    )
}

export default LearningCoordinatorConfigEditor
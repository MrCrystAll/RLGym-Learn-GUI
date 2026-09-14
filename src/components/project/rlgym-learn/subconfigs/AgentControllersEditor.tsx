import PPOConfigEditor from "./ppo/PPOConfigEditor";
import type { PPOAgentControllerConfigModel } from "rlgym-learn-client";

interface AgentControllersEditorArgs{
    agentControllerConfigModel: object | null,
    updateControllerConfigModel: (model: object)  => void,
    deleteAgent: () => void
}


function AgentControllersEditor({agentControllerConfigModel, updateControllerConfigModel, deleteAgent}: AgentControllersEditorArgs) {

    const agentControllerEditors = () => {

        if(agentControllerConfigModel === null){
            return <p>No agent config provided</p>
        }


        return <PPOConfigEditor key={"PPO"} deleteAgent={deleteAgent} agentKey={"PPO"} ppoConfig={agentControllerConfigModel as PPOAgentControllerConfigModel} setPPOConfig={(model: object) => updateControllerConfigModel(model)}/>
    }
    

    return (
        <>
            <p className="display-6">Agent controller</p>

            {agentControllerEditors()}
        </>
    )
}

export default AgentControllersEditor
import type { AgentControllerConfig, PPOAgentControllerConfigModel } from "../../../../models/rlgym-learn/api";
import PPOConfigEditor from "./ppo/PPOConfigEditor";

interface AgentControllersEditorArgs{
    agentControllersConfigModel: Record<string, AgentControllerConfig>,
    updateControllerConfigModel: (name: string, model: AgentControllerConfig) => void,
    deleteAgent: (name: string) => void
}


function AgentControllersEditor({agentControllersConfigModel, updateControllerConfigModel, deleteAgent}: AgentControllersEditorArgs) {    
    const updateAgentConfig = (name: string, model: AgentControllerConfig) => {
        updateControllerConfigModel(name, model)
    }
    
    const agentControllerEditors = () => {        
        if(agentControllersConfigModel !== undefined){
            return Object.entries(agentControllersConfigModel).map(
                (value: [string, AgentControllerConfig]) => {
                    if(value[0].startsWith("PPO")){                        
                        return <PPOConfigEditor key={value[0]} deleteAgent={deleteAgent} agentKey={value[0]} ppoConfig={value[1] as PPOAgentControllerConfigModel} setPPOConfig={(model: AgentControllerConfig) => updateAgentConfig(value[0], model)}/>
                    }
                    else{
                        return <p key={value[0]}>Unknown type for agent "{value[0]}"</p>
                    }
                }
            )
        }
        else{
            return (
                <p>Tis not normal</p>
            )
        }
    }

    const emptyMessage = () => {
        if (agentControllersConfigModel === undefined){
            return <p>No agent config provided.</p>
        }

        const entries = Object.entries(agentControllersConfigModel);

        if(entries.length === 0){
            return (
                <p>No agent controller config exist</p>
            )
        }
    }

    

    return (
        <>
            <p className="display-6">Agent controllers</p>
            {emptyMessage()}
            {agentControllerEditors()}
        </>
    )
}

export default AgentControllersEditor
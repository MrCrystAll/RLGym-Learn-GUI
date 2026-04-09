import type { AgentControllerConfig, PPOAgentControllerConfigModel } from "../../../../models/rlgym-learn/api";
import PPOConfigEditor from "./ppo/PPOConfigEditor";


function AgentControllersEditor({agentControllersConfigModel, agentControllerInput, updateControllerConfigModel}:{agentControllersConfigModel: Record<string, AgentControllerConfig | undefined>, agentControllerInput: Record<string, string>, updateControllerConfigModel: (name: string, model: AgentControllerConfig) => void}) {    
    const updateAgentConfig = (name: string, model: AgentControllerConfig) => {
        updateControllerConfigModel(name, model)
    }
    
    const agentControllerEditors = () => {
        if(agentControllerInput !== undefined){
            return Object.entries(agentControllerInput).map(
                (value: [string, string]) => {
                    if(value[1] == "ppo"){
                        return <PPOConfigEditor key={value[0]} agentKey={value[0]} ppoConfig={agentControllersConfigModel[value[0]] as PPOAgentControllerConfigModel} setPPOConfig={(model: AgentControllerConfig) => updateAgentConfig(value[0], model)}/>
                    }
                    else{
                        return <p key={value[0]}>Unknown type "{value[1]}"</p>
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
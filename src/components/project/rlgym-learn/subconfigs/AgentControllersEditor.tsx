import { useState } from "react";
import type { AgentControllerConfig, PPOAgentControllerConfigModel } from "../../../../models/rlgym-learn/api";
import PPOConfigEditor from "./ppo/PPOConfigEditor";

interface AgentControllersEditorArgs{
    agentControllersConfigModel: Record<string, AgentControllerConfig>,
    updateControllerConfigModel: (name: string, model: AgentControllerConfig) => void,
    deleteAgent: (name: string) => void
}


function AgentControllersEditor({agentControllersConfigModel, updateControllerConfigModel, deleteAgent}: AgentControllersEditorArgs) {    
    const [currentAgent, setCurrentAgent] = useState<string | null>(null);
    
    const updateAgentConfig = (name: string, model: AgentControllerConfig) => {
        updateControllerConfigModel(name, model)
    }

    const deleteAgentAndSetCurrent = (name: string) => {
        deleteAgent(name);
        setCurrentAgent(null);
    }
    
    const agentControllerEditors = () => {

        if(agentControllersConfigModel === undefined){
            return <p>No agent config provided</p>
        }

        const entries = Object.entries(agentControllersConfigModel);

        if(entries.length === 0){
            return (
                <p>No agent controller config exist</p>
            )
        }
        
        if(currentAgent === null) return <p>No agent selected</p>

        if(currentAgent.startsWith("PPO")){
            return <PPOConfigEditor key={currentAgent} deleteAgent={deleteAgentAndSetCurrent} agentKey={currentAgent} ppoConfig={agentControllersConfigModel[currentAgent] as PPOAgentControllerConfigModel} setPPOConfig={(model: AgentControllerConfig) => updateAgentConfig(currentAgent, model)}/>
        }
        return <p key={currentAgent}>Unknown type for agent "{currentAgent}"</p>
    }
    

    return (
        <>
            <p className="display-6">Agent controllers</p>

            <div className="d-flex gap-2 mb-2">
                {Object.keys(agentControllersConfigModel).map(
                    (key) => <button className={"btn btn-outline-light " + (currentAgent === key ? "active" : "")} onClick={() => setCurrentAgent(key)}>{key}</button>
                )}
            </div>

            {agentControllerEditors()}
        </>
    )
}

export default AgentControllersEditor
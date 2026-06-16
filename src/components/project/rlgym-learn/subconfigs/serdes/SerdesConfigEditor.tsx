import { useState } from "react";
import { type PyAnySerdeType, type SerdeTypesModel } from "../../../../../models/rlgym-learn/api";
import SerdesSelect from "./SerdesSelect";

interface SerdesConfigEditorArgs{
    serdesTypesModel: SerdeTypesModel,
    setSerdesTypesModel: (model: SerdeTypesModel) => void
}

function SerdesConfigEditor({serdesTypesModel, setSerdesTypesModel}:SerdesConfigEditorArgs) {

    return (
        <>
            <div className="d-flex mt-2">
                <p className="display-6">Serdes config</p>
            </div>

            <div className="d-grid gap-3" style={{gridTemplateColumns: "1fr 1fr"}}>
                <div>
                    <p className="display-5">Agent ID</p>
                    <p>Set this field as the type you expect the Agent ID to be. (This is usually set by the transition engine, but can be altered by the state mutator)</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect serdeConfig={serdesTypesModel.agent_id_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        agent_id_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">Action</p>
                    <p>Set this field as the type you expect the action to be. (Check the "ActionType" in your action parser)</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect serdeConfig={serdesTypesModel.action_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        action_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">Observation</p>
                    <p>Set this field as the type you expect the observation to be. (Check the "ObsType" in your observation builder)</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect serdeConfig={serdesTypesModel.obs_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        obs_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">Reward</p>
                    <p>Set this field as the type you expect the reward to be. (See the "RewardType") in your reward.</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect serdeConfig={serdesTypesModel.reward_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        reward_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">Observation space</p>
                    <p>Set this field as the type you expect the observation space to be. (See the get_obs_space of your observation builder)</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect serdeConfig={serdesTypesModel.obs_space_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        obs_space_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">Action space</p>
                    <p>Set this field as the type you expect the action space to be. (See the get_action_space of your action parser)</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect serdeConfig={serdesTypesModel.action_space_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        action_space_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">Shared info</p>
                    <p>Set this field as the type you expect the shared info to be. Usually it's a dictionnary, if not given, shared info will be None in the agent controllers.</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect canBeNull serdeConfig={serdesTypesModel.shared_info_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        shared_info_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">Shared info setter</p>
                    <p>The shared info setter allows you to send data to the environments from the agent controller. The serde represents what you add from the agent controller.</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect canBeNull serdeConfig={serdesTypesModel.shared_info_setter_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        shared_info_setter_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="display-5">State</p>
                    <p>Set this field as the type you expect the state to be. If not given, upon activating the state serialization in the agent controllers, the state will be None.</p>
                    <div className="bg-configuration-card">
                        <div className="my-auto me-3 p-3">
                            <SerdesSelect canBeNull serdeConfig={serdesTypesModel.state_serde_type} setSerdeConfig={
                                    (serde: PyAnySerdeType) => setSerdesTypesModel({
                                        ...serdesTypesModel,
                                        state_serde_type: serde
                                    })
                                }/>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


export default SerdesConfigEditor
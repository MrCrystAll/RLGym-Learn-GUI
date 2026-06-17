import { type PyAnySerdeType, type SerdeTypesModel } from "../../../../../models/rlgym-learn/api";
import SerdesSelect from "./SerdesSelect";

interface SerdesConfigEditorArgs{
    serdesTypesModel: SerdeTypesModel,
    setSerdesTypesModel: (model: SerdeTypesModel) => void
}

function SerdesConfigEditor({serdesTypesModel, setSerdesTypesModel}:SerdesConfigEditorArgs) {

    const serdeText = (serdeName: string, serdeText: string) => {
        return <div>
            <p className="display-6">{serdeName}</p>
            <p>{serdeText}</p>
        </div>
    }

    return (
        <>
            <div className="modal modal-xl" tabIndex={-1} id="serdesHelp">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light border-light">
                    <div className="modal-header">
                        <h5 className="modal-title">Information about serdes</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className="display-5">What is a serde?</p>
                        <p>A serde is an object used to serialize and deserialize an object in order to put and read this object from/to shared memory.</p>
                        
                        <hr></hr>
                        <p>Below is the list and an explanation for each serde.</p>

                        <div className="d-grid gap-2" style={{gridTemplateColumns: "1fr 1fr"}}>

                            {serdeText("Float", "Allows you to serialize a float into shared memory.")}
                            {serdeText("Int", "Allows you to serialize an integer into shared memory.")}
                            {serdeText("String", "Allows you to serialize a string into shared memory.")}
                            {serdeText("Boolean", "Allows you to serialize a bool into shared memory.")}
                            {serdeText("Bytes", "Allows you to \"serialize\" bytes into shared memory.")}
                            {serdeText("Complex", "Allows you to serialize coimplex numbers into shared memory.")}
                            {serdeText("Numpy (WIP)", "Allows you to serialize a numpy array into shared memory. You need to specify the data type used in this numpy array in order to serialize it. This serde is incomplete in the GUI for now due to the fact that the arguments are pickled python functions.")}
                            {serdeText("Tuple", "Allows you to serialize a tuple of elements into shared memory. You need to specify the type of each element, even if they are the same.")}
                            {serdeText("Set", "Allows you to serialize a sequence of elements of same type into shared memory. You need to specify the type of the items.")}
                            {serdeText("Typed dictionary", "Allows you to serialize a specific architecture of dictionary. You can for example, specify you want a String serde for a key called'Key1' and a Numpy serde for another key called 'Key2'.")}
                            {serdeText("Dictionary", "Allows you to serialize a python dictionary into shared memory. The keys must be of the same type, and so on for the values. You need to specify both the key and value types.")}
                            {serdeText("Option", "Allows you to serialize an optional field into shared memory. You need to specify the type of the value if given.")}
                            {serdeText("Union", "Not implemented in this GUI, the only reason is because it requires a python function to be used, like the Numpy serde. Allows you to serialize an object that can be of different types. You need to specify each type.")}

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
            <div className="d-flex mt-2">
                <p className="display-6">Serdes config</p>
            </div>

            <button className="btn btn-outline-light bi bi-info-circle m-auto" data-bs-toggle="modal" data-bs-target="#serdesHelp"> Help</button>

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
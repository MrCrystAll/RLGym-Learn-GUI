import { useState } from "react";
import { type PyAnySerdeType, type SerdeTypesModel } from "../../../../../models/rlgym-learn/api";
import SerdesSelect from "./SerdesSelect";

interface SerdesConfigEditorArgs{
    serdesTypesModel: SerdeTypesModel,
    setSerdesTypesModel: (model: SerdeTypesModel) => void
}

function SerdesConfigEditor({serdesTypesModel, setSerdesTypesModel}:SerdesConfigEditorArgs) {
    const [editMode, setEditMode] = useState(false);

    if(editMode){
        return <div>
            <p className="display-5">Serdes config options</p>
            <hr className="w-75"/>

                <div>
                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Action serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect serdeConfig={serdesTypesModel.action_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    action_serde_type: serde
                                })
                            }/>
                            
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Action space serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect serdeConfig={serdesTypesModel.action_space_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    action_space_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>
                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Observation serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect serdeConfig={serdesTypesModel.obs_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    obs_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>

                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Observation space serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect serdeConfig={serdesTypesModel.obs_space_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    obs_space_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>

                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Reward serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect serdeConfig={serdesTypesModel.reward_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    reward_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>

                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Agent ID serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect serdeConfig={serdesTypesModel.agent_id_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    agent_id_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>

                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Shared info serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect canBeNull={true} serdeConfig={serdesTypesModel.shared_info_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType | null) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    shared_info_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>

                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Shared info setter serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect canBeNull={true} serdeConfig={serdesTypesModel.shared_info_setter_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType | null) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    shared_info_setter_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>

                    <div className="form-group mb-3 row">
                        <label className="col-sm-2 col-form-label">Game state serde</label>
                        <div className="col-sm-10">
                            <SerdesSelect canBeNull={true} serdeConfig={serdesTypesModel.state_serde_type} setSerdeConfig={
                                (serde: PyAnySerdeType | null) => setSerdesTypesModel({
                                    ...serdesTypesModel,
                                    state_serde_type: serde
                                })
                            }/>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button className="btn btn-success" type="button" onClick={() => setEditMode(false)}>OK</button>
                    </div>
                </div>
        </div>
    }
    else{
        return (
            <>
                <div className="d-flex">
                    <p className="display-6">Serdes config config</p>
                    <button className="btn btn-dark" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill"></i></button>
                </div>
                    
                <p className="text-break">{JSON.stringify(serdesTypesModel)}</p>
            </>

        )
    }
}


export default SerdesConfigEditor
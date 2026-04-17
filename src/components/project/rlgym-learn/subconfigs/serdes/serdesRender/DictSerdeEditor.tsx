import type { DictSerdeType, PyAnySerdeType } from "../../../../../../models/rlgym-learn/api"
import SerdesSelect from "../SerdesSelect"

interface DictSerdeEditorArgs{
    serdeConfig: DictSerdeType,
    setSerdeConfig: (config: DictSerdeType) => void
}

function DictSerdeEditor({serdeConfig, setSerdeConfig}:DictSerdeEditorArgs) {
    return <div className="border p-2">
                <div className="form-group mb-3 mt-3 row">
                    <label className="col-sm-1 col-form-label">Keys serde</label>
                    <div className="col-sm-11">
                        <SerdesSelect serdeConfig={serdeConfig.keys_serde_type} setSerdeConfig={
                            (serde: PyAnySerdeType) => setSerdeConfig({
                                ...serdeConfig,
                                keys_serde_type: serde
                            })
                        }/>
                    </div>
                </div>
                <div className="form-group mb-3 row">
                    <label className="col-sm-1 col-form-label">Values serde</label>
                    <div className="col-sm-11">
                        <SerdesSelect serdeConfig={serdeConfig.values_serde_type} setSerdeConfig={
                            (serde: PyAnySerdeType) => setSerdeConfig({
                                ...serdeConfig,
                                values_serde_type: serde
                            })
                        }/>
                    </div>
                </div>
            </div>
}


export default DictSerdeEditor
import type { PyAnySerdeType, SetSerdeType } from "../../../../../../models/rlgym-learn/api"
import SerdesSelect from "../SerdesSelect"

interface SetSerdeEditorArgs{
    serdeConfig: SetSerdeType,
    setSerdeConfig: (config: SetSerdeType) => void
}

function SetSerdeEditor({serdeConfig, setSerdeConfig}:SetSerdeEditorArgs) {
    return <div className="border p-2">
                <div className="form-group mb-3 mt-3 row">
                    <label className="col-sm-1 col-form-label">Value serde</label>
                    <div className="col-sm-11">
                        <SerdesSelect serdeConfig={serdeConfig.items_serde_type} setSerdeConfig={
                            (serde: PyAnySerdeType) => setSerdeConfig({
                                ...serdeConfig,
                                items_serde_type: serde
                            })
                        }/>
                    </div>
                </div>
            </div>
}


export default SetSerdeEditor
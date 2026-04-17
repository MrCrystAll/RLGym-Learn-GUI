import type { OptionSerdeType, PyAnySerdeType } from "../../../../../../models/rlgym-learn/api"
import SerdesSelect from "../SerdesSelect"

interface OptionSerdeEditorArgs{
    serdeConfig: OptionSerdeType,
    setSerdeConfig: (config: OptionSerdeType) => void
}

function OptionSerdeEditor({serdeConfig, setSerdeConfig}:OptionSerdeEditorArgs) {
    return <div className="border p-2">
                <div className="form-group mb-3 mt-3 row">
                    <label className="col-sm-1 col-form-label">Value serde</label>
                    <div className="col-sm-11">
                        <SerdesSelect serdeConfig={serdeConfig.value_serde_type} setSerdeConfig={
                            (serde: PyAnySerdeType) => setSerdeConfig({
                                ...serdeConfig,
                                value_serde_type: serde
                            })
                        }/>
                    </div>
                </div>
            </div>
}


export default OptionSerdeEditor
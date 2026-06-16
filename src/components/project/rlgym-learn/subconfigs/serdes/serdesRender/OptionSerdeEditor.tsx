import type { OptionSerdeType, PyAnySerdeType } from "../../../../../../models/rlgym-learn/api"
import SerdesSelect from "../SerdesSelect"

interface OptionSerdeEditorArgs{
    serdeConfig: OptionSerdeType,
    setSerdeConfig: (config: OptionSerdeType) => void
}

function OptionSerdeEditor({serdeConfig, setSerdeConfig}:OptionSerdeEditorArgs) {
    return <div>
                <div className="d-flex mt-2">
                    <p className="me-1 my-auto">Value type</p>
                    <div className="flex-fill">
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
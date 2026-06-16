import type { DictSerdeType, PyAnySerdeType } from "../../../../../../models/rlgym-learn/api"
import SerdesSelect from "../SerdesSelect"

interface DictSerdeEditorArgs{
    serdeConfig: DictSerdeType,
    setSerdeConfig: (config: DictSerdeType) => void
}

function DictSerdeEditor({serdeConfig, setSerdeConfig}:DictSerdeEditorArgs) {
    return <div className="p-2">
                <div>
                    <label>Keys serde</label>
                    <div>
                        <SerdesSelect serdeConfig={serdeConfig.keys_serde_type} setSerdeConfig={
                            (serde: PyAnySerdeType) => setSerdeConfig({
                                ...serdeConfig,
                                keys_serde_type: serde
                            })
                        }/>
                    </div>
                </div>
                <div>
                    <label>Values serde</label>
                    <div >
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
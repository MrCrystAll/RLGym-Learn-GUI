import { NumpyDType, type NumpySerdeType } from "../../../../../../models/rlgym-learn/api"
interface NumpySerdeEditorArgs{
    serdeConfig: NumpySerdeType,
    setSerdeConfig: (config: NumpySerdeType) => void
}

function NumpySerdeEditor({serdeConfig, setSerdeConfig}:NumpySerdeEditorArgs) {
    return <div>
                <div>
                    <div className="mt-2 ms-4">
                        <select className="form-select" onChange={(event) => {
                            setSerdeConfig({
                                ...serdeConfig,
                                dtype: event.target.value
                            })
                        }} defaultValue={serdeConfig.dtype}>
                            <option value={NumpyDType.INT32}>Int (32-bit)</option>
                            <option value={NumpyDType.INT64}>Int (64-bit)</option>
                            <option value={NumpyDType.FLOAT32}>Float (32-bit)</option>
                            <option value={NumpyDType.FLOAT64}>Float (64-bit)</option>
                        </select>
                    </div>
                </div>
            </div>
}


export default NumpySerdeEditor
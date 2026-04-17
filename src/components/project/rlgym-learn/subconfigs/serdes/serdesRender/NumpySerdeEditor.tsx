import { NumpyDType, type NumpySerdeType } from "../../../../../../models/rlgym-learn/api"
interface NumpySerdeEditorArgs{
    serdeConfig: NumpySerdeType,
    setSerdeConfig: (config: NumpySerdeType) => void
}

function NumpySerdeEditor({serdeConfig, setSerdeConfig}:NumpySerdeEditorArgs) {
    return <div className="border p-2">
                <div className="form-group mb-3 mt-3 row">
                    <label className="col-sm-1 col-form-label">Value serde</label>
                    <div className="col-sm-11">
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
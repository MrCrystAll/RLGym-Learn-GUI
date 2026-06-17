import { Serde, type PyAnySerdeType, type TupleSerdeType } from "../../../../../../models/rlgym-learn/api";
import SerdesSelect from "../SerdesSelect";

interface TupleSerdeEditorArgs{
    serdeConfig: TupleSerdeType
    setSerdeConfig: (config: TupleSerdeType) => void
}

function TupleSerdeEditor({serdeConfig, setSerdeConfig}:TupleSerdeEditorArgs) {

    const updateAtIndex = (value: PyAnySerdeType, index: number) => {
        const arr = [...serdeConfig.item_serde_types];

        arr[index] = value

        setSerdeConfig({
            ...serdeConfig,
            item_serde_types: arr
        })
    }

    const addElement = () => {
        setSerdeConfig({
            ...serdeConfig,
            item_serde_types: [...serdeConfig.item_serde_types, Serde.FLOAT()]
        })
    }

    const deleteAt = (index: number) => {
        const arr = [...serdeConfig.item_serde_types]
        arr.splice(index, 1)

        setSerdeConfig({
            ...serdeConfig,
            item_serde_types: arr === undefined ? [] : arr
        })
    }

    return (
        <div>
            {serdeConfig.item_serde_types.map((value: PyAnySerdeType, index: number) => {
                return (
                <div className="d-flex mt-2" key={index}>
                    <div className="flex-fill">
                     <SerdesSelect serdeConfig={value} setSerdeConfig={
                        (value) => updateAtIndex(value, index)
                    }></SerdesSelect>
                    </div>
                    <button className="btn btn-danger ms-3" onClick={() => deleteAt(index)}><i className="bi bi-x"></i></button>
                </div>
                )
            })}

            <button className="btn btn-outline-light mt-2" onClick={addElement}>Add element</button>
        </div>
    )
}

export default TupleSerdeEditor
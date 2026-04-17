import { NumpyDType, Serde, SerdeType, type DictSerdeType, type NumpySerdeType, type OptionSerdeType, type PyAnySerdeType, type SetSerdeType, type TupleSerdeType, type TypedDictSerdeType } from "../../../../../models/rlgym-learn/api";
import DictSerdeEditor from "./serdesRender/DictSerdeEditor";
import TupleSerdeEditor from "./serdesRender/TupleSerdeEditor";
import TypedDictSerdeEditor from "./serdesRender/TypedDictSerdeEditor";
import OptionSerdeEditor from "./serdesRender/OptionSerdeEditor";
import NumpySerdeEditor from "./serdesRender/NumpySerdeEditor";
import SetSerdeEditor from "./serdesRender/SetSerdeEditor";

interface SerdesSelectArgs{
    serdeConfig: PyAnySerdeType | null,
    setSerdeConfig: (serde: PyAnySerdeType | null) => void,

    canBeNull?: boolean
}

function SerdesSelect({serdeConfig, setSerdeConfig, canBeNull}: SerdesSelectArgs){
    const serdeOptions = () => {
        return (
            <>
                <option value={SerdeType.STRING}>String</option>
                <option value={SerdeType.FLOAT}>Float</option>
                <option value={SerdeType.INT}>Int</option>
                <option value={SerdeType.NUMPY}>Numpy</option>
                <option value={SerdeType.TUPLE}>Tuple</option>
                <option value={SerdeType.SET}>Set</option>
                <option value={SerdeType.TYPEDDICT}>Typed dictionary</option>
                <option value={SerdeType.DICT}>Dictionary</option>
                <option value={SerdeType.OPTION}>Option</option>
                <option value={SerdeType.BOOL}>Boolean</option>
                <option value={SerdeType.BYTES}>Bytes</option>
                <option value={SerdeType.COMPLEX}>Complex</option>
            </>
        )
    }

    const updateSerdeType = (serde: SerdeType) => {
        switch (serde) {
            case SerdeType.DICT:
                setSerdeConfig(
                    Serde.DICT()
                )
                break;
            case SerdeType.TUPLE:
                setSerdeConfig(
                    Serde.TUPLE([])
                );
                break;
            case SerdeType.SET:
                setSerdeConfig(
                    Serde.SET(Serde.FLOAT())
                );
                break;
            case SerdeType.TYPEDDICT:
                setSerdeConfig(
                    Serde.TYPEDDICT({})
                );
                break;
            case SerdeType.OPTION:
                setSerdeConfig(
                    Serde.OPTION(Serde.FLOAT())
                );
                break;
            case SerdeType.NUMPY:
                setSerdeConfig(
                    Serde.NUMPY(NumpyDType.FLOAT64)
                );
                break;
            default:
                setSerdeConfig({
                    type: serde
                })
                break;
        }
    }

    const serdeSpecifics = () => {
        switch (serdeConfig?.type) {
            case SerdeType.DICT:                
                return <DictSerdeEditor serdeConfig={serdeConfig as DictSerdeType} setSerdeConfig={setSerdeConfig}></DictSerdeEditor>
            case SerdeType.TUPLE:
            
                return <TupleSerdeEditor serdeConfig={serdeConfig as TupleSerdeType} setSerdeConfig={setSerdeConfig}></TupleSerdeEditor>
            case SerdeType.TYPEDDICT:
                return <TypedDictSerdeEditor serdeConfig={serdeConfig as TypedDictSerdeType} setSerdeConfig={setSerdeConfig}></TypedDictSerdeEditor>
            case SerdeType.OPTION:
                return <OptionSerdeEditor serdeConfig={serdeConfig as OptionSerdeType} setSerdeConfig={setSerdeConfig}></OptionSerdeEditor>
            case SerdeType.NUMPY:
                return <NumpySerdeEditor serdeConfig={serdeConfig as NumpySerdeType} setSerdeConfig={setSerdeConfig}></NumpySerdeEditor>
            case SerdeType.SET:
                return <SetSerdeEditor serdeConfig={serdeConfig as SetSerdeType} setSerdeConfig={setSerdeConfig}></SetSerdeEditor>
            default:                
                return undefined
        }
    }

    const deleteButton = () => {
        if(canBeNull){
            return <button className="btn btn-danger" onClick={
                () => {setSerdeConfig(null); }
            }>Delete serde<i className="bi bi-x"></i></button>
        }
    }

    if(serdeConfig === null){
        return <div>
            <p>No serde given</p>
            <button className="btn btn-primary" onClick={
                () => {setSerdeConfig(Serde.STRING());}
            }>Create serde</button>
        </div>
    }
    return (

        <div>
            {deleteButton()}
            <select className="form-select" defaultValue={serdeConfig.type} onChange={(event) => updateSerdeType(event.target.value)}>
                {serdeOptions()}
            </select>
            {serdeSpecifics()}
        </div>
    )

    
}

export default SerdesSelect
import NumberField from "../config-cards/NumberField";
import StringField from "../config-cards/StringField";
import ToggleField from "../config-cards/ToggleCard";

interface DefaultJSONDescriptionArgs{
  object: object
  updateValue: (key: string, value: unknown | null) => void
  title: string
}

function DefaultJSONDescription({object, updateValue, title}: DefaultJSONDescriptionArgs) {
    const updateInnerObject = (objectKey: string, toUpdateKey: string, value: unknown | null) => {
        updateValue(objectKey, {
            ...object[objectKey],
            [toUpdateKey]: value
        })
    } 

    const display = () => {
        if(object === null) return <p>NULL</p>
        if(Object.keys(object).length === 0) return <p>Empty</p>
        else return <div className="bg-configuration-card">
        {
            Object.entries(object).map(
                (entry) => {
                    const key = entry[0];
                    const value = entry[1];

                    if(typeof value === "number") {
                        return (
                            <>
                                <NumberField value={value} help="No help available" icon="emoji-expressionless" onChange={(updatedValue) => updateValue(key, updatedValue)} text={key} key={key}></NumberField>
                                <hr className="mx-2 my-1"></hr>
                            </>
                        )
                    }
                    else if(typeof value === "string"){
                        return (
                            <>
                                <StringField value={value} help="No help available" icon="emoji-expressionless" onChange={(updatedValue) => updateValue(key, updatedValue)} text={key} key={key}></StringField>
                                <hr className="mx-2 my-1"></hr>
                            </>
                        )
                    }
                    else if(typeof value === "boolean"){
                        return (
                            <>
                                <ToggleField value={value} help="No help available" icon="emoji-expressionless" onToggle={() => updateValue(key, !value)} text={key} key={key}></ToggleField>
                                <hr className="mx-2 my-1"></hr>
                            </>
                        )
                    }
                    else if(typeof value === "object"){
                        console.log(key, value);
                        
                        return <DefaultJSONDescription title={key} object={value} updateValue={(toUpdateKey, updatedValue) => updateInnerObject(key, toUpdateKey, updatedValue)} key={key}></DefaultJSONDescription>
                    }
                    return <p key={key}>{key} - {value}</p>
                }
            )
        }
    </div>
    }
    
  return (
    <div className="border p-3">
    <p className="text-secondary">This is a default rendering method, which is not guaranteed to support everything in the config</p>
    <p className="display-5">{title}</p>
    {display()}
    </div>
    
  )
}

export default DefaultJSONDescription

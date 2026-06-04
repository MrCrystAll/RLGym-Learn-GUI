import NumberField from "../config-cards/NumberField";
import StringField from "../config-cards/StringField";
import ToggleField from "../config-cards/ToggleCard";

interface DefaultJSONDescriptionArgs{
  object: object
  updateValue: (key: string, value: unknown | null) => void
  title: string
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
                            <div key={key}>
                                <NumberField value={value} help="No help available" icon="emoji-expressionless" onChange={(updatedValue) => updateValue(key, updatedValue)} text={capitalizeFirstLetter(key.replaceAll("_", " "))}></NumberField>
                                <hr className="mx-2 my-1"></hr>
                            </div>
                        )
                    }
                    else if(typeof value === "string"){
                        return (
                            <div key={key}>
                                <StringField value={value} help="No help available" icon="emoji-expressionless" onChange={(updatedValue) => updateValue(key, updatedValue)} text={capitalizeFirstLetter(key.replaceAll("_", " "))}></StringField>
                                <hr className="mx-2 my-1"></hr>
                            </div>
                        )
                    }
                    else if(typeof value === "boolean"){
                        return (
                            <div key={key}>
                                <ToggleField value={value} help="No help available" icon="emoji-expressionless" onToggle={() => updateValue(key, !value)} text={capitalizeFirstLetter(key.replaceAll("_", " "))}></ToggleField>
                                <hr className="mx-2 my-1"></hr>
                            </div>
                        )
                    }
                    else if(typeof value === "object"){
                        return <DefaultJSONDescription title={key} object={value} updateValue={(toUpdateKey, updatedValue) => updateInnerObject(key, toUpdateKey, updatedValue)} text={capitalizeFirstLetter(key.replaceAll("_", " "))}></DefaultJSONDescription>
                    }
                    return <p key={key}>{key} - {value}</p>
                }
            )
        }
    </div>
    }
    
  return (
    <div className="border-top py-2">
    <p className="text-secondary">This section uses default rendering, meaning the maintainer doesn't have a rendering schema for this object. Objects that aren't number, string or boolean will be treated as a full object rather that their type. Stuff like devices, dtypes will not be choosable (but you can still type them in).</p>
    <p className="display-5">{capitalizeFirstLetter(title.replaceAll("_", " "))}</p>
    {display()}
    </div>
    
  )
}

export default DefaultJSONDescription

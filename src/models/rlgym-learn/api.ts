// Placeholder for your Python PyAnySerdeType
// Replace with a more specific type if you know its structure

export enum SerdeType{
  STRING = "string",
  FLOAT = "float",
  INT = "int",
  BOOL = "bool",
  BYTES = "bytes",
  COMPLEX = "complex",
  NUMPY = "numpy",
  TUPLE = "tuple",
  SET = "set",
  TYPEDDICT = "typeddict",
  DICT = "dict",
  OPTION = "option"
}

export interface PyAnySerdeType {
  type: SerdeType
}

export interface TupleSerdeType extends PyAnySerdeType{
  item_serde_types: PyAnySerdeType[]
}

export interface SetSerdeType extends PyAnySerdeType{
  items_serde_type: PyAnySerdeType
}

export interface TypedDictSerdeType extends PyAnySerdeType{
  key_serde_type_dict: Record<string, PyAnySerdeType>
}

export interface DictSerdeType extends PyAnySerdeType{
  keys_serde_type: PyAnySerdeType
  values_serde_type: PyAnySerdeType
}

export interface OptionSerdeType extends PyAnySerdeType{
  value_serde_type: PyAnySerdeType
}

interface NumpySerdeTypeConfig{
  type: "dynamic"
  preprocessor_fn_pkl: null,
  postprocessor_fn_pkl: null
}

export interface NumpySerdeType extends PyAnySerdeType{
  config: NumpySerdeTypeConfig
  dtype: NumpyDType
}

export class Serde {
  static TUPLE(items_serde_types:PyAnySerdeType[]) {
    const serde: TupleSerdeType = {
      type: SerdeType.TUPLE,
      item_serde_types: items_serde_types
    } 
    return serde
  }

  static SET(items_serde_types:PyAnySerdeType) {
    const serde: SetSerdeType = {
      type: SerdeType.SET,
      items_serde_type: items_serde_types
    } 
    return serde
  }

  static INT() {
    const serde: PyAnySerdeType = {
      type: SerdeType.INT
    }
    return serde
  }

  static FLOAT() {
    const serde: PyAnySerdeType = {
      type: SerdeType.FLOAT
    }
    return serde
  }

  static STRING() {
    const serde: PyAnySerdeType = {
      type: SerdeType.STRING
    }
    return serde
  }

  static DICT(
    keysSerde?: PyAnySerdeType,
    valuesSerde?: PyAnySerdeType
  ) {
    const serde: DictSerdeType = {
      type: SerdeType.DICT,
      keys_serde_type: keysSerde === undefined ? Serde.FLOAT() : keysSerde,
      values_serde_type: valuesSerde === undefined ? Serde.FLOAT() : valuesSerde
    }
    return serde;
  }

  static TYPEDDICT(
    serdesDict: Record<string, PyAnySerdeType> 
  ) {
    const serde: TypedDictSerdeType = {
      type: SerdeType.TYPEDDICT,
      key_serde_type_dict: serdesDict
    }
    return serde;
  }

  static OPTION(
    valueSerde: PyAnySerdeType
  ) {
    const serde: OptionSerdeType = {
      type: SerdeType.OPTION,
      value_serde_type: valueSerde
    }
    return serde;
  }

  static NUMPY(
    dtype: NumpyDType
  ){
    const serde: NumpySerdeType = {
      type: SerdeType.NUMPY,
      dtype: dtype,
      config: {
        postprocessor_fn_pkl: null,
        preprocessor_fn_pkl: null,
        type: "dynamic"
      }
    }
    return serde;
  }
}

export enum NumpyDType {
  INT32 = "int32",
  INT64 = "int64",

  FLOAT32 = "float32",
  FLOAT64 = "float64"
}
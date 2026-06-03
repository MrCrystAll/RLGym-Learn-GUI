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

// Placeholder for your Python PydanticTorchDevice
export type PydanticTorchDevice = "cpu" | "cuda" | "auto";
export type PydanticTorchDtype = "float32" | "float64";

export enum NumpyDType {
  INT32 = "int32",
  INT64 = "int64",

  FLOAT32 = "float32",
  FLOAT64 = "float64"
}

// -----------------------------
// PPOLearnerConfigModel
// -----------------------------
export interface PPOLearnerConfigModel {
  dtype: PydanticTorchDtype; // default: torch.float32
  n_epochs: number; // default: 1
  batch_size: number; // default: 50000
  n_minibatches: number; // default: 1
  ent_coef: number; // default: 0.005
  clip_range: number; // default: 0.2
  actor_lr: number; // default: 3e-4
  critic_lr: number; // default: 3e-4
  advantage_normalization: boolean; // default: true
  device: PydanticTorchDevice; // default: "auto"
  cudnn_benchmark_mode: boolean; // default: true
}

// -----------------------------
// ExperienceBufferConfigModel
// -----------------------------
export interface ExperienceBufferConfigModel {
  max_size: number; // default: 100000
  device: PydanticTorchDevice; // default: "auto"
  save_experience_buffer_in_checkpoint: boolean; // default: true

  // Dict[str, Any]
  trajectory_processor_config: Record<string, unknown>; // default: {}
}

export interface AgentControllerConfig{
} 

// -----------------------------
// PPOAgentControllerConfigModel
// -----------------------------
export interface PPOAgentControllerConfigModel extends AgentControllerConfig {
  timesteps_per_iteration: number; // default: 50000
  save_every_ts: number; // default: 1_000_000
  run_suffix: string; // default: "-${timestamp}"
  checkpoint_load_folder?: string | null
  n_checkpoints_to_keep: number; // default: 5
  random_seed: number; // default: 123
  save_mid_iteration_data_in_checkpoint: boolean; // default: true

  learner_config: PPOLearnerConfigModel; // default: PPOLearnerConfigModel()
  experience_buffer_config: ExperienceBufferConfigModel; // default: ExperienceBufferConfigModel()

  run_name: string; // default: "rlgym-learn-run"

  // Dict[str, Any]
  metrics_logger_config: Record<string, unknown>; // default: {}
}

// -----------------------------
// ProcessConfigModel
// -----------------------------
export interface ProcessConfigModel {
  n_proc: number; // default: 8
  min_process_steps_per_inference: number; // default: -1
  render: boolean; // default: false
  render_delay: number; // default: 0
  instance_launch_delay: number | null; // default: None
  recalculate_agent_id_every_step: boolean; // default: false
}

// -----------------------------
// SerdeTypesModel
// -----------------------------
export interface SerdeTypesModel {
  agent_id_serde_type: PyAnySerdeType;
  action_serde_type: PyAnySerdeType;
  obs_serde_type: PyAnySerdeType;
  reward_serde_type: PyAnySerdeType;
  obs_space_serde_type: PyAnySerdeType;
  action_space_serde_type: PyAnySerdeType;

  // Optional fields
  shared_info_serde_type?: PyAnySerdeType | null; // default: null
  shared_info_setter_serde_type?: PyAnySerdeType | null; // default: null
  state_serde_type?: PyAnySerdeType | null; // default: null
}

// -----------------------------
// BaseConfigModel
// -----------------------------
export interface BaseConfigModel {
  serde_types: SerdeTypesModel;
  random_seed: number; // default: 123
  shm_buffer_size: number; // default: 16384
  flinks_folder: string; // default: "shmem_flinks"
  timestep_limit: number; // default: 5_000_000_000
  batched_tensor_action_associated_learning_data: boolean; // default: true
}

// -----------------------------
// LearningCoordinatorConfigModel
// -----------------------------
export interface LearningCoordinatorConfigModel {
  base_config: BaseConfigModel; // default: BaseConfigModel()
  process_config: ProcessConfigModel; // default: ProcessConfigModel()

  agent_controllers_config: Record<string, AgentControllerConfig>; // default: {}

  agent_controllers_save_folder: string; // default: "agent_controllers_checkpoints"
}
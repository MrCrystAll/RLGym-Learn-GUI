import { Serde, type BaseConfigModel, type ProcessConfigModel } from "../../../../models/rlgym-learn/api";

export const DEFAULT_PROCESS_CONFIG: ProcessConfigModel = {
            min_process_steps_per_inference: 1,
            n_proc: 1,
            recalculate_agent_id_every_step: true,
            render: false,
            render_delay: 0,
            instance_launch_delay: null
        }

export const DEFAULT_BASE_MODEL: BaseConfigModel = {
            random_seed: 123,
            batched_tensor_action_associated_learning_data: true,
            serde_types: {
                action_serde_type: Serde.FLOAT(),
                agent_id_serde_type: Serde.FLOAT(),
                obs_serde_type: Serde.FLOAT(),
                action_space_serde_type: Serde.FLOAT(),
                obs_space_serde_type: Serde.FLOAT(),
                reward_serde_type: Serde.FLOAT(),
                shared_info_serde_type: Serde.FLOAT(),
                shared_info_setter_serde_type: Serde.FLOAT(),
                state_serde_type: Serde.FLOAT()
            },
            flinks_folder: "shmem_flinks",
            shm_buffer_size: 8192,
            timestep_limit: 1_000_000_000
        }

export const DEFAULT_SAVE_FOLDER = "agent_controllers_checkpoints"
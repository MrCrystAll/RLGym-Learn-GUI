import type { ExperienceBufferConfigModel, PPOAgentControllerConfigModel, PPOLearnerConfigModel } from "../../../../../models/rlgym-learn/api";

export const PPO_EXPERIENCE_BUFFER_DEFAULT_CONFIG: ExperienceBufferConfigModel = {
    device: "auto",
    max_size: 100_000,
    save_experience_buffer_in_checkpoint: true,
    trajectory_processor_config: {}
}

export const PPO_LEARNER_DEFAULT_CONFIG: PPOLearnerConfigModel = {
    actor_lr: 3e-4,
    critic_lr: 3e-4,
    advantage_normalization: true,
    batch_size: 50_000,
    clip_range: 0.2,
    cudnn_benchmark_mode: true,
    device: "auto",
    dtype: "float32",
    ent_coef: 0.005,
    n_epochs: 1,
    n_minibatches: 1
}

export const PPO_DEFAULT_CONFIG: PPOAgentControllerConfigModel = {
    add_unix_timestamp: true,
    experience_buffer_config: PPO_EXPERIENCE_BUFFER_DEFAULT_CONFIG,
    learner_config: PPO_LEARNER_DEFAULT_CONFIG,
    metrics_logger_config: {},
    n_checkpoints_to_keep: 5,
    random_seed: 123,
    run_name: "rlgym-learn-run",
    save_every_ts: 1_000_000,
    save_mid_iteration_data_in_checkpoint: true,
    timesteps_per_iteration: 50_000,
    type: "ppo",
    checkpoint_load_folder: null
}
import type { LearningCoordinatorConfigModel } from "../../../models/rlgym-learn/api";
import { DEFAULT_BASE_MODEL, DEFAULT_PROCESS_CONFIG, DEFAULT_SAVE_FOLDER } from "./subconfigs/default_configs";
import { PPO_DEFAULT_CONFIG } from "./subconfigs/ppo/default_config";

export const DEFAULT_LEARNING_COORDINATOR_CONFIG: LearningCoordinatorConfigModel = {
    base_config: DEFAULT_BASE_MODEL,
    agent_controllers_config: {
        "ppo": PPO_DEFAULT_CONFIG
    },
    agent_controllers_save_folder: DEFAULT_SAVE_FOLDER,
    process_config: DEFAULT_PROCESS_CONFIG
}
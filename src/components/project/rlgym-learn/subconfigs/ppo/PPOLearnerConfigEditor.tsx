import { PPOLearnerConfigModelDeviceEnum, PPOLearnerConfigModelDtypeEnum, type PPOLearnerConfigModel } from "rlgym-learn-client";
import NumberField from "../../../../config-cards/NumberField";
import ToggleField from "../../../../config-cards/ToggleCard";
import NumberCard from "../../../../config-cards/NumberCard";
import SelectField from "../../../../config-cards/SelectField";

interface PPOLearnerConfigEditorArgs{
    ppoLearnerConfig: PPOLearnerConfigModel
    setPPOLearnerConfig: (config: PPOLearnerConfigModel) => void
}

function PPOLearnerConfigEditor({ppoLearnerConfig, setPPOLearnerConfig}: PPOLearnerConfigEditorArgs) {   
    return (
        <div>

            <div>
                <p className="display-6">Learner settings</p>
                <div className="mb-3">
                    <div className="d-flex gap-3">
                        <NumberCard text="Actor LR" value={ppoLearnerConfig.actor_lr} required help="The learning rate of the actor, the recommended values are somewhere around 9e-5 at first, and then slowly go towards 2e-5 after a few billions of steps" icon="book" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        actor_lr: value
                    })}></NumberCard>
                    <NumberCard text="Critic LR" value={ppoLearnerConfig.critic_lr} required help="The learning rate of the critic, the recommended values are somewhere around 9e-5 at first, and then slowly go towards 2e-5 after a few billions of steps" icon="book" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        critic_lr: value
                    })}></NumberCard>
                    </div>
                </div>

                <div className="bg-configuration-card rounded">
                    <SelectField defaultValue={ppoLearnerConfig.device} help="Device used by the learner to compute gradients and store batches. It is recommended to use your GPU." icon="cpu" text="Device" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        device: value as PPOLearnerConfigModelDeviceEnum
                    })} values={Object.values(PPOLearnerConfigModelDeviceEnum)}></SelectField>
                    <hr className="mx-2 my-1"></hr>
                    <SelectField defaultValue={ppoLearnerConfig.dtype} help="Data type used by the experience buffer (might change)" icon="6-square" text="Data type" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        dtype: value as PPOLearnerConfigModelDtypeEnum
                    })} values={Object.values(PPOLearnerConfigModelDtypeEnum)}></SelectField>
                    <hr className="mx-2 my-1"></hr>
                    <NumberField text="Batch size" intOnly value={ppoLearnerConfig.batch_size} required help="Size of the batch. A batch is a bunch of data from the experience buffer. Try to set as a high value" icon="collection-fill" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        batch_size: value
                    })}></NumberField>
                    <hr className="mx-2 my-1"></hr>
                    <NumberField text="Number of minibatches" intOnly value={ppoLearnerConfig.n_minibatches} required help="Amount of minibatches. A minibatch is a part of a batch, used to compute loss and gradients" icon="collection" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        n_minibatches: value
                    })}></NumberField>
                    <hr className="mx-2 my-1"></hr>
                    <NumberField text="Entropy coefficient" value={ppoLearnerConfig.ent_coef} required help="Allows the bot to explore more without being punished. Modify at your own risk, this is a sensitive value" icon="search" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        ent_coef: value
                    })}></NumberField>
                    <hr className="mx-2 my-1"></hr>
                    <NumberField text="Clip range" value={ppoLearnerConfig.clip_range} required help="A PPO specific field, allows you to make more significant updates, at the risk of them being bad. Modify at your own risk" icon="scissors" onChange={(value) => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        clip_range: value
                    })}></NumberField>
                    <hr className="mx-2 my-1"></hr>
                    
                    <ToggleField text="Advantage normalization" help="Normalizes advantages, can help if your rewards are poorly scaled" icon="border" value={ppoLearnerConfig.advantage_normalization} onToggle={() => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        advantage_normalization: !ppoLearnerConfig.advantage_normalization
                    })}></ToggleField>
                    <hr className="mx-2 my-1"></hr>
                    <ToggleField text="CUDNN Benchmark mode" help="Unsure what this does" icon="bug" value={ppoLearnerConfig.cudnn_benchmark_mode} onToggle={() => setPPOLearnerConfig({
                        ...ppoLearnerConfig,
                        cudnn_benchmark_mode: !ppoLearnerConfig.cudnn_benchmark_mode
                    })}></ToggleField>
                </div>
            </div>
        </div>
        
    )
}

export default PPOLearnerConfigEditor
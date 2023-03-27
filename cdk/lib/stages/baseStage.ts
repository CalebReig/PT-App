import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcsStack } from '../stacks/EcsStack';

interface IBaseStageProps extends StageProps {
  readonly stageName: string
}

export class BaseStage extends Stage {
    constructor(scope: Construct, id: string, props?: IBaseStageProps) {
      super(scope, id, props);

      const ecsStack = new EcsStack(this, 'EcsStack', props);
    }
}
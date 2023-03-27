import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { 
  CodePipeline, 
  CodePipelineSource, 
  ShellStep,
  CodeBuildStep
} from 'aws-cdk-lib/pipelines';
import { BaseStage } from './stages/baseStage';
import * as path from 'path';

export class Pipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'PT-App-Pipeline', {
      pipelineName: 'PT-App-Pipeline',
      synth: new CodeBuildStep('SynthStep', {
        // PUT YOUR CODE REPO + BRANCH HERE
        input: CodePipelineSource.gitHub('CalebReig/PT-App', 'main'),
        installCommands: ['cd cdk', 'npm i -g npm@latest'],
        commands: ['npm -v', 'npm ci', 'npm run build', 'npx cdk synth'],
        primaryOutputDirectory: path.join('cdk', 'cdk.out')
      })
    });

    // DEV Stage
    const devStage = pipeline.addStage(new BaseStage(this, 'dev', {
      env: {
        account: '036089650674',
        region: 'us-west-1'
      },
      stageName: 'dev'
    }));

  }
}

#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EcsStack } from '../lib/ecs-stack';

const app = new cdk.App();
new EcsStack(app, 'EcsStack', {
    env: {
            account: '036089650674', 
            region: 'us-west-1'
    }
});
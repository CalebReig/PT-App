#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { Pipeline } from '../lib/pipeline';

const app = new App();

new Pipeline(app, 'Pipeline', {
  env: {
    account: '036089650674',
    region: 'us-west-1',
  }
});

app.synth();
import { Vpc }  from "aws-cdk-lib/aws-ec2";
import { 
  Role,
  ServicePrincipal,
  PolicyStatement
} from "aws-cdk-lib/aws-iam";
import { 
  FargateTaskDefinition,
  ContainerImage,
  AwsLogDriver 
} from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { 
  Stack,
  StackProps 
} from 'aws-cdk-lib';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { Construct } from 'constructs';
import * as path from 'path';
import { 
  DnsRecordType,
  PrivateDnsNamespace 
} from 'aws-cdk-lib/aws-servicediscovery';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb';


export class EcsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Look up the default VPC
    const vpc = Vpc.fromLookup(this, "VPC", {
      isDefault: true
    });

    const namespace = new PrivateDnsNamespace(this, 'PTAPPNamespace', {
      name: 'pt-app.local',
      vpc: vpc,
    });

    // IAM Role
    const taskIamRole = new Role(this, "AppRole", {
      roleName: "AppRole",
      assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    const taskDefinition = new FargateTaskDefinition(this, 'Task', {
      taskRole: taskIamRole,
    });

    // Docker image Assets
    const frontEndImage = new DockerImageAsset(this, 'FrontEndImage', {
        directory: path.join(__dirname, '../..', 'front-end'),
        invalidation: {
          buildArgs: false,
        },
      });

    const backEndImage = new DockerImageAsset(this, 'BackEndImage', {
        directory: path.join(__dirname, '../..', 'back-end'),
        invalidation: {
          buildArgs: false,
          },
        });

    // Frontend container added to ECS cluster with link to backend
    const frontendContainer = taskDefinition.addContainer('FrontEndContainer', {
      image: ContainerImage.fromDockerImageAsset(frontEndImage),
      portMappings: [{ containerPort: 3000 }],
      memoryReservationMiB: 50,
      cpu: 1,
      logging: new AwsLogDriver({ streamPrefix: 'front-end' }),
    });

    // Backend container added to ECS cluster
    const backendContainer = taskDefinition.addContainer('BackEndContainer', {
      image: ContainerImage.fromDockerImageAsset(backEndImage),
      portMappings: [{ containerPort: 8000 }],
      memoryReservationMiB: 50,
      cpu: 1,
      logging: new AwsLogDriver({ streamPrefix: 'back-end' }),
    });

    // Load Balancer
    new ApplicationLoadBalancedFargateService(this, "PTApp", {
      vpc: vpc,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      serviceName: 'PTApp',
      assignPublicIp: true,
      publicLoadBalancer: true,
      protocol: ApplicationProtocol.HTTPS,
      cloudMapOptions: {
        name: 'pt-app',
        cloudMapNamespace: namespace,
        dnsRecordType: DnsRecordType.A,
      }
    });

  // create DynamoDB table
  const table = new Table(this, 'UserTable', {
    partitionKey: { name: 'id', type: AttributeType.STRING },
    tableName: 'user',
  });

  backendContainer.addToExecutionPolicy(new PolicyStatement({
    actions: [
      'dynamodb:Query',
      'dynamodb:Scan',
      'dynamodb:GetItem',
      'dynamodb:PutItem',
      'dynamodb:UpdateItem',
      'dynamodb:DeleteItem',
    ],
    resources: [table.tableArn],
  }));

  }
}

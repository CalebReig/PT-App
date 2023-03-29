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
  CfnService,
  PrivateDnsNamespace 
} from 'aws-cdk-lib/aws-servicediscovery';
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

    // ECS Service discovery
    const service = new CfnService(this, 'Service', {
      name: 'my-service',
      namespaceId: namespace.namespaceId,
      dnsConfig: {
        dnsRecords: [
          {
            ttl: 60,
            type: 'A'
          }
        ],
        namespaceId: namespace.namespaceId,
        routingPolicy: 'MULTIVALUE'
      },
      healthCheckCustomConfig: {
        failureThreshold: 1
      }
    });

    const serviceArn = service.attrArn;
    const serviceUrl = `http://${serviceArn.split('/')[1]}`;

    // Frontend container added to ECS cluster with link to backend
    taskDefinition.addContainer('FrontEndContainer', {
      image: ContainerImage.fromDockerImageAsset(frontEndImage),
      portMappings: [{ containerPort: 3000 }],
      memoryReservationMiB: 50,
      cpu: 1,
      logging: new AwsLogDriver({ streamPrefix: 'front-end' }),
      environment: {
        BACKEND_URL: `${serviceUrl}:8000`,
      },
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
    });

  // create DynamoDB table
  const table = new Table(this, 'Table', {
    partitionKey: { name: 'id', type: AttributeType.STRING },
    tableName: 'MyTable',
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

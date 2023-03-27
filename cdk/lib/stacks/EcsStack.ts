import { Vpc }  from "aws-cdk-lib/aws-ec2";
import { 
  Role,
  ServicePrincipal
} from "aws-cdk-lib/aws-iam";
import { 
  FargateTaskDefinition,
  ContainerImage 
} from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { 
  Stack,
  StackProps 
} from 'aws-cdk-lib';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { Construct } from 'constructs';
import * as path from 'path'

export class EcsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Look up the default VPC
    const vpc = Vpc.fromLookup(this, "VPC", {
      isDefault: true
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
        directory: path.join(__dirname, '../../..', 'front-end'),
        invalidation: {
          buildArgs: false,
        },
      });

    const backEndImage = new DockerImageAsset(this, 'BackEndImage', {
        directory: path.join(__dirname, '../../..', 'back-end'),
        invalidation: {
          buildArgs: false,
          },
        });

    // Docker Containers
    taskDefinition.addContainer('FrontEndContainer', {
      image: ContainerImage.fromDockerImageAsset(frontEndImage),
      portMappings: [{ containerPort: 3000 }],
      memoryReservationMiB: 50,
      cpu: 1,
    });

    taskDefinition.addContainer('BackEndContainer', {
      image: ContainerImage.fromDockerImageAsset(backEndImage),
      portMappings: [{ containerPort: 8000 }],
      memoryReservationMiB: 50,
      cpu: 1,
    });


    new ApplicationLoadBalancedFargateService(this, "PTApp", {
      vpc: vpc,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      serviceName: 'PTApp',
      assignPublicIp: true,
      publicLoadBalancer: true,
    })
  }
}

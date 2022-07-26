import { App, Stack, StackProps } from "aws-cdk-lib";
import { ConfigService } from "./common/config/config.service";
import { CdkPipelines } from "./cdk_pipelines";
import { MyS3App } from "./my_s3_app";

export class InfrastructureBase extends Stack {
  constructor(app: App, stackName: string, stackProps: StackProps) {
    super(app, stackName, stackProps);
  }

  // Instantiate my constructs
  protected cdkPipelines = new CdkPipelines(this, this.stackName);
  protected myApp = new MyS3App(this, this.stackName);

  // Add App 1 to the Pipeline
  protected cdkPipeline = this.cdkPipelines.addStage(new MyS3App(this, this.stackName));
}

// Setup the application
const config = new ConfigService().stackConfig;
const app = new App();
const stackName = config.stackPrefix;

const stackProps: StackProps = {
  env: {
    region: "eu-west-1",
    account: config.accountId,
  },
};

new InfrastructureBase(app, stackName, stackProps);

app.synth();

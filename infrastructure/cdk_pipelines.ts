import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

interface PipelineOptions {
  pipelineName: string;
}

export class CdkPipelines {
  constructor(private parent: Construct, private stackName: string) {}

  public createPipeline(options: PipelineOptions) {
    const { pipelineName } = options;

    const pipeline = new CodePipeline(this.parent, `${this.stackName}-Pipeline-${pipelineName}`, {
      pipelineName: `${this.stackName}-${pipelineName}`,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection("maxhayward/cdk-pipelines", "main", {
          connectionArn: "arn:aws:codestar-connections:eu-west-1:984806001929:connection/718db28d-f7fe-4a5d-b765-7d883a0fd2a8",
        }),
        commands: ['yarn ci', 'yarn build', 'yarn cdk synth']
      })
    });

    return pipeline;
  }
}
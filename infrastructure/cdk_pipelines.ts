import { Stage } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class CdkPipelines {
  private pipeline: CodePipeline;

  constructor(private parent: Construct, private stackName: string) {
    this.pipeline = new CodePipeline(this.parent, `${this.stackName}-Pipeline`, {
      pipelineName: `${this.stackName}-Pipeline`,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection("maxhayward/cdk-pipelines", "main", {
          connectionArn: "arn:aws:codestar-connections:eu-west-1:984806001929:connection/718db28d-f7fe-4a5d-b765-7d883a0fd2a8",
        }),
        installCommands: ["make install"],
        commands: ["make build", "make synth"],
      })
    });
  }

  public addStage(stage: Stage) {
    this.pipeline.addStage(stage);
  }
}
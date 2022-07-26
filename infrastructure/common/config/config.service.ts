import { StackConfig, IStackConfig } from "./config.model";

export class ConfigService {
  private cdkContext?: string = process.env.CDK_CONTEXT_JSON;
  private account?: string = process.env.CDK_DEFAULT_ACCOUNT;
  private region?: string = process.env.CDK_DEFAULT_REGION;
  public stackConfig = new StackConfig({
    context: this.getCdkContext(),
    account: this.getDefaultAccount(),
    region: this.getDefaultRegion(),
  });

  private getCdkContext(): IStackConfig {
    if (this.cdkContext) {
      return JSON.parse(this.cdkContext);
    }
    throw new Error("CDK_CONTEXT_JSON is missing.");
  }

  private getDefaultAccount(): string {
    if (this.account) {
      return this.account;
    }
    throw new Error("CDK_DEFAULT_ACCOUNT is missing.");
  }

  private getDefaultRegion(): string {
    if (this.region) {
      return this.region;
    }
    throw new Error("CDK_DEFAULT_REGION is missing.");
  }
}

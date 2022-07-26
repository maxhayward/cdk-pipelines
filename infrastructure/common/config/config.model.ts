export interface IStackConfig {
  stackPrefix: string;
}

export interface IStackConfigParams {
  context: IStackConfig;
  account: string;
  region: string;
}

export class StackConfig {
  public stackPrefix = this.makePrefix();
  public accountId = this.getAccountId();
  public region = this.getDefaultRegion();

  constructor(private stackContext: IStackConfigParams) { }

  private getStackContext(): IStackConfig {
    return this.stackContext.context;
  }

  private getAccountId(): string {
    return this.stackContext.account;
  }

  private getDefaultRegion(): string {
    return this.stackContext.region;
  }

  private getStackPrefix(): string {
    const prefix = this.getStackContext().stackPrefix;
    if (!prefix) {
      throw new Error(`Missing 'stackPrefix' parameter from context`);
    }
    return prefix;
  }

  private makePrefix(): string {
    const prefix = this.getStackPrefix();
    return prefix.substring(0, 30);
  }
}

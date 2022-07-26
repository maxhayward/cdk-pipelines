import { Aspects, Tag } from "aws-cdk-lib";
import { Construct } from "constructs";
import { EnvironmentTag, ServiceNameTag, ServiceTypeTag } from "./tags.model";

export class TagsService {
  public static setEnvironmentTag(construct: Construct, environment: EnvironmentTag): void {
    Aspects.of(construct).add(new Tag("billing:environment", environment));
  }

  public static setServiceNameTag(construct: Construct, serviceName: ServiceNameTag): void {
    Aspects.of(construct).add(new Tag("billing:servicename", serviceName));
  }

  public static setServiceTypeTag(construct: Construct, serviceType: ServiceTypeTag): void {
    Aspects.of(construct).add(new Tag("billing:servicetype", serviceType));
  }

  public static setCustomTag(construct: Construct, key: string, value: string): void {
    Aspects.of(construct).add(new Tag(key, value));
  }
}

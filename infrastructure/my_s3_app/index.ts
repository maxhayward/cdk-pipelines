import { Stack, Stage } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class MyS3Stage extends Stage {
  constructor(private parent: Construct, private stackName: string) {
    super(parent, `${stackName}-MyS3Stage`, {});

    new S3App(this.parent, this.stackName);
  }
}

class S3App extends Stack {
  public readonly bucket: Bucket;

  constructor(private parent: Construct, private myStackName: string) {
    super(parent, `${myStackName}-MyS3Stage`, {});

    const bucketName = "max-test-cdk-pipelines-bucket";

    this.bucket = new Bucket(this.parent, `${this.myStackName}-Bucket-${bucketName}`, {
      bucketName: bucketName,
    });
  }
}
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSource from 'aws-cdk-lib/aws-lambda-event-sources';

export class Step1SqsToLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //lambda 
    const sqsLambda = new lambda.Function(this, "sqs_lambda_function", {
      functionName: "SQS_Lambda",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: "hello.handler"
    });

    //sqs queue used as eventbridge buffer here - but it also works as a dead letter queue , which works on the failure 
    const queue = new sqs.Queue(this, "SqsQueue", {
      queueName: "testQueue",
      encryption: sqs.QueueEncryption.UNENCRYPTED,
      retentionPeriod: Duration.days(4),
      visibilityTimeout: Duration.seconds(30),                           //default
      receiveMessageWaitTime: Duration.seconds(20)                       //default
    });

    //adding lambda to event Source
    sqsLambda.addEventSource(
      new lambdaEventSource.SqsEventSource(queue, {                                       //lambda ko add krdo sqs-event-source ke through queue ke andar
        batchSize: 10
      })
    )



  }
}

# Lambda Handler for checking status URLS


This lambda should be deployed once per AWS account & 1 Cloudwatch rule per URL triggered by multiple CloudWatch Event Rules.

i.e. to check 20 hosts we have 1 x Lambda + 20 x Healthcheck URL Rules in Cloudwatch

1. Upload the Lambda .zip file to Lambda.
2. Configure SNS topics
3. Using CloudWatch Events - configure 1 healthcheck per URL with a cron of 5 minutes and JSON code.

Thats it. 


## Packaging

To build an AWS Lambda compatible ZIP file for NodeJS:

```
npm install
zip -r monitoring.zip config index.js lambda node_modules
```

## Deployment

* Configure as NodeJS Lambda
* Handler: index.monitoringHandler
* Memory: 128MB
* Timeout: 1 minute

* Environment Variables:

```
DEBUG = true
SNS_ARN = "<insert full SNS topic ARN>"
```

## Execution

The Cloudwatch Event Rule should be configured with static JSON as the input to the Lambda Event it's triggering:

## MODIFY BELOW

```
{
  "url" : "https://ENTERURL.COM/status/", 
  "subject" : "ALERT SUBJECT" 
}

```


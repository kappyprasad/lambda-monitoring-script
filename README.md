# Lambda Handler for checking status URLS

This lambda should be deployed once per account, and then triggered by multiple CloudWatch Event Rules.
Each Rule will pass in the config of the service to check.

i.e. to check 20 hosts we have 1 x Lambda + 20 x Rules

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
  "url" : "https://ENTERURL.COM/status/", # Modify URL
  "ipStatusAuthCode" : "XXXXX", # If needed otherwise comment out
  "subject" : "ALERT SUBJECT" # Modify Subject
}

```


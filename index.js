/*
 * Lambda function for monitoring Url health checks.
 *
 * Requires the following Environment variables:
 * "SNS_ARN": full ARN of the SNS topic to publish errors to
 * "DEBUG": "true" or "false" as to logging debug statements
 */

//Lambda expects a default "index.js"
var monitoringHandler = require('./lambda/monitoringLambda');

exports.monitoringHandler = monitoringHandler.handle;

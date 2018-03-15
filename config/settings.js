//process.env corresponds to "Environment variables" on the Lambda Configuration console
module.exports = {
    debug : process.env.DEBUG,
    arn: process.env.SNS_ARN,
    timeout: 30000 //30 sec - this is the default timeout when waiting for status checks
};
'use strict';

var settings = require('../config/settings');

var request = require('request');

var log4js = require('log4js');
var logger = log4js.getLogger('MonitoringLambda');
logger.setLevel('debug');

var AWS = require('aws-sdk');
var sns = new AWS.SNS();

/**
 * AWS Lambda Handler
 * Event: input that will be sent from CloudWatch Rule. This is an object
 * Context: Lambda Context
 * Callback: function(error, success);
 */
exports.handle = (event, context, callback) => {

    //ensure we terminate as soon as we call the callback
    context.callbackWaitsForEmptyEventLoop = false;

    if (settings.debug === 'true') {
        logger.debug("Received Event: " + JSON.stringify(event));
    }

    //default headers
    var headers = {
        'cache-control': 'no-cache'
    };

    //if we need to set X-IP-STATUS-AUTH-CODE then ensure the input event has the property  ipStatusAuthCode = code
    if (event.ipStatusAuthCode) {
        headers['X-IP-STATUS-AUTH-CODE'] = event.ipStatusAuthCode;
    }

    //if you're calling an Amazon API Gateway that requires API Keys
    if (event.awsApiKey) {
        headers['x-api-key'] = event.awsApiKey;
    }

    request.get(
        {
            url: event.url,
            headers: headers,
            timeout: settings.timeout  //currently configured as 30 seconds
        },
        function (error, response, body) {

            //successful response from the endpoint just logs the response and returns
            if (response.statusCode === 200) {
                logger.debug("200 Success: " + body);
                callback(null, body);
            } else {
                //any failures result in sending the response via SNS
                var message =   event.subject + ' - received' + response.statusCode;
                logger.error('Failed check: ' + response.statusCode);
                sns.publish({
                    TopicArn: settings.arn,
                    Subject: message,
                    Message: body
                }, function(err, data) {
                    if (err) {
                        logger.error('Unable to send SNS: ' + err); //just log that we couldn't send SNS
                    }
                    else {
                        logger.debug('SNS Sent: ' + data); // successful send of SNS
                    }
                    callback(message);
                });
            }
        }
    );

}
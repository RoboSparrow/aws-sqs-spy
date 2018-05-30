const AWS = require('aws-sdk');
require('./bootstrap');

const receiveMessage = function(QueueUrl) {
    const params = {
        QueueUrl,
        AttributeNames: [
            'All'
        ],
        MaxNumberOfMessages: 10
    };

    const sqs = new AWS.SQS();
    return sqs.receiveMessage(params)
    .promise();
};

const getQueueUrl = function(QueueName, ownerAccount) {

    const params = {
        QueueName,
    };

    if (typeof ownerAccount === 'string' && ownerAccount) {
        params.QueueOwnerAWSAccountId = ownerAccount;
    }

    const sqs = new AWS.SQS();
    return sqs.getQueueUrl(params)
    .promise();
};

const listQueues = function(QueueNamePrefix) {

    let params = {};

    if (typeof QueueNamePrefix === 'string' && QueueNamePrefix) {
        params = {
            QueueNamePrefix,
        };
    }

    const sqs = new AWS.SQS();
    return sqs.listQueues(params)
    .promise();
};

const getMessages = function(QueueName, ownerAccount) {
    return getQueueUrl(QueueName, ownerAccount)
    .then(response => receiveMessage(response.QueueUrl));
};

module.exports = {
    getQueueUrl,
    receiveMessage,
    listQueues,
    getMessages,
};

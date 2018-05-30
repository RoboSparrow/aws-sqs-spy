const fs = require('fs');

const sqs = require('./aws/sqs');
const Log = require('./lib/Log');

const queue = process.argv[2];
const now = new Date().toISOString();

Log.section(queue);

// sqs.listQueues()
// .then(response => console.log(response));

// sqs.getQueueUrl(queue)
// .then(response => console.log(response))

sqs.getMessages(queue)
.then((response) => {
    const messages = response.Messages || [];
    console.log(messages);
    Log.success(`Received ${messages.length} Messages from ${queue}`);
    return messages;
})
.then((messages) => {
    const file = `./messages/${queue}.${now}.json`;
    fs.writeFileSync(file, JSON.stringify(messages, null, 4), 'utf8');
    Log.step(`Messages stored in ${file}`);
    return messages;
})
.catch((error) => {
    console.error(error);
    Log.error(`Received above error from ${queue}`);
    return false;
});

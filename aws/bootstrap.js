const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

////
// aws setup
////
const _private = path.resolve(path.join(__dirname, '/../.private'));

const hasProfile = fs.existsSync(_private + '/aws-profile.json');
const hasKeyfile = fs.existsSync(_private + '/aws-credentials.json');

const bootstrap = function() {

    if (hasProfile) {
        /* eslint-disable global-require, import/no-dynamic-require */
        const auth = require(_private + '/aws-profile.json');
        /* eslint-enable global-require, import/no-dynamic-require */
        const credentials = new AWS.SharedIniFileCredentials({
            profile: auth.profile,
        });

        AWS.config.update({
            region: auth.region,
            credentials
        });

        return AWS.config;

    }

    if (hasKeyfile) {
        AWS.config.loadFromPath(_private + '/aws-credentials.json');
        return AWS.config;
    }

    return null;
};

module.exports = (() => bootstrap())();

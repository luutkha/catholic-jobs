const fs = require('fs')
const { Client } = require('@elastic/elasticsearch')
const { elsConfig } = require('./vars');

const client = new Client({
    ...elsConfig,
    tls: {
        ca: fs.readFileSync('./http_ca.crt'),
        rejectUnauthorized: false
    }
})


module.exports = client
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const client = require('./config/els')
const mongoose = require('./config/mongoose');
// open mongoose connection
mongoose.connect();


async function run() {
    // Change below to check connected function instead
    try {

        const result = await client.search({
            index: 'jobs-index',
            "from": 0, "size": 10,
            query: {
                // match: { content: 'test01' }
                match_all: {}

            }
        })
        console.log('ELS connected!')
        console.log(result.hits.hits)
    }
    catch (e) {
        console.log('Elastic search error when try to connect!');
    }

}

run().catch(console.log)

app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");

// Create a ServiceBroker
// open mongoose connection
mongoose.connect();

// listen to requests
// app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
const broker = new ServiceBroker();

const svc = broker.createService({
    mixins: [ApiService],

    settings: {
        port: 3001,
        server: true // Default is "true"
    }
});


// Use ApiGateway as middleware
app.use("/v1", svc.express());
// Listening
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

// Start server
broker.start();
/**
* Exports express
* @public
*/
module.exports = app;

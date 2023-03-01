// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const client = require('./config/els')
const mongoose = require('./config/mongoose');
const { SocketAddress } = require('net');

//socket
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

server.listen(port, () => logger.info(`server started on port ${port} (${env})`));

io.on('connection', (socket) => {
    console.log('có người connect vô socket', socket.id, new Date().toLocaleString())
    // when the client emits 'new message', this listens and executes

    socket.on('send_message', (data) => {
        // we tell the client to execute 'new message'
        console.log('client id', socket.id)
        console.log('data from client', data)
        // to all clients in the current namespace except the sender
        // socket.broadcast.emit('send_message', data);

        io.emit('send_message', data)
    });

    socket.on('disconnect', () => {
        console.log('====> thằng cha này disconnect rồi: ', socket.id, new Date().toLocaleString())
    })
})



// open mongoose connection
mongoose.connect();

async function run() {
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


}

run().catch(console.log)

// app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;

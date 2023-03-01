const app = require('../../../config/express');
const express = require('express');

const { Server } = require("socket.io");
const router = express.Router();

const io = new Server({ /* options */ });


router.route('/')
    .get((req, res) => {
        io.on("connection", (socket) => {
            console.log('some', socket)
        });

        console.log('abcd')
        return res.json('abcdef')
    })

module.exports = router;

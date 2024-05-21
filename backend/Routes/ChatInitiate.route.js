const express = require('express');
const router = express.Router();
const io = require('../helpers/socket');


router.post("/chat-start", (req,res) => {
    io.getIO().emit('chat-initiate', io);

    res.send({
        status: 200,
        data: io
    })
});


module.exports = router;
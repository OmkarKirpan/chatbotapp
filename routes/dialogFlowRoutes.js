const express = require('express');
const router = express.Router();
const chatbot = require('../chatbot/chatbot');

let MessagesModel = require('../models/messages')


// router.get('/', (req, res) => {
//     res.send({
//         'hello': 'there'
//     });
// });

router.post('/api/df_text_query', async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
});

router.post('/api/df_event_query', async (req, res) => {
    let responses = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
});

router.get('/api/saveMsgs', (req, res) => {

    res.send({
        'hello': 'there'
    });
});

module.exports = router;
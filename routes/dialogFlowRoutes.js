const express = require('express');
const router = express.Router();
const chatbot = require('../chatbot/chatbot');
var mongoose = require("mongoose");
const Messages = require('../models/messages')


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

router.post('/api/saveMsgs', (req, res) => {
    Messages.findOneAndUpdate({
        session_id: req.body.sessionId
    }, {
        messages: req.body.messages,
        user_id: req.body.userId,
        session_id: req.body.sessionId,
        dropOff: req.body.dropOff
    }, {
        upsert: true,
        new: true
    }).exec().then(result => {
        // console.log(result);
        res.send({
            'savedMessages': result
        });
    }).catch(err => {
        console.log(err);
        res.send({
            'Error': err
        });
    });
});

router.get('/api/stats', async (req, res) => {
    let engagementRate = await Messages.countDocuments({}).exec();
    let completion = await Messages.countDocuments({
        dropOff: "Great, come back soon!"
    }).exec();

    let dropOffs = await Messages.countDocuments({
        dropOff: {
            $ne: "Great, come back soon!"
        }
    }).exec();

    let dropOffmsg = await Messages.find({
        dropOff: {
            $ne: "Great, come back soon!"
        }
    }).exec();

    let mdrops = [];
    dropOffmsg.map(val => {
        mdrops.push(val.dropOff);
    })
    var fdrops = {};
    for (var i = 0; i < mdrops.length; i++) {
        var num = mdrops[i];
        fdrops[num] = fdrops[num] ? fdrops[num] + 1 : 1;
    }

    const mostFrequent = arr =>
        Object.entries(
            arr.reduce((a, v) => {
                a[v] = a[v] ? a[v] + 1 : 1;
                return a;
            }, {})
        ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

    let mostFrequentDropOff = mostFrequent(mdrops);

    // console.log(engagementRate, completion, dropOffs);

    res.send({
        'engagementRate': engagementRate,
        'completionRate': ((completion / engagementRate) * 100) + '%',
        'completion': completion,
        'dropOffs': dropOffs,
        "dropOffRate": ((dropOffs / engagementRate) * 100) + '%',
        "mostFrequentDropOff": mostFrequentDropOff,
        "dropOffmsg": fdrops
    });
});

module.exports = router;
var mongoose = require("mongoose");

var MessagesSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    messages: {
        type: Array
    },
    user_id: {
        type: String,
    },
    session_id: {
        type: String,
    },
    dropOff: {
        type: String,
    }
});


module.exports = mongoose.model('Messages', MessagesSchema);
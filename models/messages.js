var mongoose = require("mongoose");

var MessagesSchema = new mongoose.Schema({
    messages: {
        type: Array,
        index: true
    },
    user_id: {
        type: String,
        index: true
    },
});

var Messages = mongoose.model('Messages', MessagesSchema);

module.exports = {
    Messages: Messages
}
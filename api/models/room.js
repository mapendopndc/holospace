const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    arModel: { type: String, require: true}
});

module.exports = mongoose.model('Room', roomSchema);
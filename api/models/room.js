const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    password: { type: String, required: false},
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    arModelKey: { type: String, require: true}
});

module.exports = mongoose.model('Room', roomSchema);
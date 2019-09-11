const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String }
}, {
    collection: 'user'
});

const User = Mongoose.model('User', UserSchema);

module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hash: String
});

userSchema.methods.setPassword = async function (password) {
    this.hash = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.hash);
};

const User = mongoose.model('users', userSchema);
module.exports = User;
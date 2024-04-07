// backend/models/login.js

const mongoose = require('mongoose');

const loginTestSchema = new mongoose.Schema({
    name: String,
    password: String
});

const LoginTest = mongoose.model('LoginTest', loginTestSchema);

module.exports = LoginTest;

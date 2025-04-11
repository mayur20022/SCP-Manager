const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true, match: /^[0-9]{10}$/ },
    password: { type: String, required: true, minlength: 12 },
});

module.exports = mongoose.model('Scp', userSchema);

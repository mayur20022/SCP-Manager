const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, match: /^[0-9]{10}$/ },
    village: String,
    crops: [String],
});

module.exports = mongoose.model('Farmer', farmerSchema);

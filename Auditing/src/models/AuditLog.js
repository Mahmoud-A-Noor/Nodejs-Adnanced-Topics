const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    action: { type: String, required: true },
    userId: { type: String },
    timestamp: { type: Date, default: Date.now },
    details: { type: Object },
});

module.exports = mongoose.model('Audit', auditSchema);
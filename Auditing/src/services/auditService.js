const Audit = require('../models/AuditLog');
const fs = require('fs');
const path = require('path');

// used to save log to DB (Database Based Logging)
const saveAuditLog = async (log) => {
    try {
        const auditLog = new Audit(log);
        await auditLog.save();
    } catch (error) {
        console.error('Failed to save audit log:', error);
    }
};

// used to save log to file (File Based Logging)
const saveAuditLogFile = async (log) => {
    const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(log)}\n`;
    const auditFilePath = path.join(__dirname, '../../logs/audit.log');

    const logDirectory = path.dirname(auditFilePath);
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });  // This will create the 'logs' directory
    }
    
    fs.appendFile(auditFilePath, logEntry, (err) => {
        if (err) console.error('Failed to save audit log:', err);
    });
};

module.exports = { saveAuditLog, saveAuditLogFile };
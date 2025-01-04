const auditEmitter = require('../utils/eventEmitter');

const auditMiddleware = (req, res, next) => {
  res.on('finish', () => {
      if (req.method !== 'GET') { // you may not want to log GET requests because they typically do not modify data, and logging all GET requests could create unnecessary logs.
          auditEmitter.emit('audit', {
              action: `${req.method} ${req.originalUrl}`,
              userId: req.user?.id || 'Anonymous',
              details: req.body || {},
          });
      }
  });
  next();
};

module.exports = auditMiddleware;
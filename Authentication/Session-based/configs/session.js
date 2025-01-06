const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const sessionConfig = {
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({
    db: 'database.db', // Store sessions in SQLite DB
    table: 'sessions'   // Custom table name for storing sessions
  }),
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 30 // Session expires in 30 minutes
  }
};

module.exports = sessionConfig;
/**
 * i have not yet tried to test the OR condition in the config file
 */

const config = {
    // The database host
    host: process.env.DB_HOST,
    // The database user
    user: process.env.DB_USERNAME,
    // The database password
    password: process.env.DB_PASSWORD,
    // The database port
    port: process.env.DB_PORT,
    // The database name
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
  };

  module.exports = {config}
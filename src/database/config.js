/**
 * i have not yet tried to test the OR condition in the config file
 */
exports.config = {
    // The database host
    host: process.env.DB_HOST || "localhost",
    // The database user
    user: process.env.DB_USERNAME || "root",
    // The database password
    password: process.env.DB_PASSWORD || "root",
    // The database name
    database: process.env.DB_DATABASE || "Databasteknik",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idlTimeout: 60000,
    queueLimit: 0,
};

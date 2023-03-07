
// delete this i think
const mysql = require('mysql2');
const { config } = require('./database/config');

function getUsers(callback) {
  const pool = mysql.createPool(config);
  let queryResult;
  pool.query('SELECT * FROM users_test_simple', function (err, rows, fields) {
    if (!err) {
      queryResult = rows;
      callback(null, queryResult);
    } else {
      callback(err);
    }
  });
}

module.exports = {
  getUsers,
};

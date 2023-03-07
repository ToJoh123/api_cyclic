/**
 * delete a country from the database
 */

//database connection, TO DO: move to separate file, maybe use mysql2/promise
const mysql = require('mysql2'); 
const {config} = require('../../database/config');
const pool = mysql.createPool(config);

exports.deleteFunction = function deleteFunction (req, res) {

    const { name } = req.body;
    pool.execute('DELETE FROM Countries WHERE Name = ?', [name], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Something went wrong')
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Country does not exist')
            return;
        }
        if (result.affectedRows === 1) {
            res.status(200).send('Country deleted')
            return;
        }
        res.status(200).send(result)
    }
    )

}


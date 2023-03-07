
const mysql = require('mysql2'); //database
const {config} = require('../../database/config');
const pool = mysql.createPool(config);
let data = []
pool.query("SELECT * FROM Countries", function(err, rows, fields) {
  // Connection is automatically released when query resolves'
  if (err) {
      console.log("err",err)
  }

  //push data to array
  rows.forEach(row => {
    data.push(row)
  }
  )
})


exports.getFunction = function getFunction(req, res) {
  const countryURL  = req.params.id
  if (!countryURL) {
    names = []
    data.forEach(data => names.push(data.Name)) //to do ->obs 
    // const names = data.map(row => row.name)
    // console.log(names)
    res.status(400).send({
      message: 'You didnt search for a country name, you can search on these:',names
    })

    return;
  }
  if (countryURL) {

    //do we need to sanitize the input?

    const countryIndex = data.findIndex(chosenCountry => chosenCountry.Name === countryURL)  //to do ->Name is case sensitive
    if (countryIndex === -1) {
      return res.status(404).send('This country does not exist in our database')
    }
    res.send(data[countryIndex])
    res.status(200)
  }


}
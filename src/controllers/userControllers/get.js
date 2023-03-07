// path: src/routes/userRoutes/get.js
const mysql = require('mysql2'); //database
const {config} = require('../../database/config');



// TO DO: if you add a country it does not show up in the list of countries if you make a new search
const pool = mysql.createPool(config);
let data = []
pool.query("SELECT * FROM Countries", function(err, rows, fields) {
  if (err) {
      console.log("err",err)
  }
  rows.forEach(row => {
    data.push(row)
  }
  )
})

exports.getFunction = function getFunction(req, res) {

  const countryURL  = req.params.id
  if (!countryURL) {
    names = []
    data.forEach(data => names.push(data.Name)) //<-- observe the capital N
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
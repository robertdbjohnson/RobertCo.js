const express = require('express')
const path = require('path')
require('dotenv').config();
const appointmentsController = require("./controllers/appointmentsController.js")
const PORT = process.env.PORT || 5000

express()
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({extended:true}))
  .set('views', 'views')
  .set('view engine', 'ejs')
  .get("/getPerson", getPerson)

  .get("/appointments", appointmentsController.getAllAppointments)
  .post("/appointments", appointmentsController.postAppointment)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getPerson(req, res) {
    console.log("Getting person from information.")
    var id = req.query.id;
    console.log("Retrieving person with id: ", id);

    getPersonFromDb(id, function(error, result) {
        console.log("Back from the database with result:", result);
        res.json(result);
        res.end();
    });
}  

function getPersonFromDb(id, callback) {
    console.log("getPersonFromDb called with id:", id);

    var sql = "SELECT id, first, last, phone, email, date, time FROM persons WHERE id = $1::int";
    var param = [id];
    pool.query(sql, param, function(err, result) {
        console.log("Found DB result: " + JSON.stringify(result.rows));
        callback(null, result.rows);
    }) 
}


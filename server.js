const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://robertcouser:robertco@localhost:5432/robertco";
const pool = new Pool({connectionString: connectionString});

express()
  .use(express.static('public'))
  .set('views', 'views')
  .set('view engine', 'ejs')
  .get("/getPerson", getPerson)

  .get("/appointments", function(req, res) {
    console.log("getting all appointments");
    var result = {
        appointments: [
            {first:"Robert", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"},
            {first:"Heidi", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"},
            {first:"Joseph", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"}
        ]
    }
    res.json(result);
  })


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


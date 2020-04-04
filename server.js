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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



function getPerson(req, res) {
    console.log("Getting person from information.")
    var id = req.query.id;
    console.log("Retrieving person with id: ", id);

    getPersonFromDb(id, function(error, result) {

        if (error || result == null || result.length != 1) {
            res.status(500).json({success:false, data: error});
        } else {
            res.json(result[0]);
        }

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
        if (err) {
            console.log("An error occured with the DB");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result: " + JSON.stringify(result.rows));
        callback(null, result.rows);
    })

}


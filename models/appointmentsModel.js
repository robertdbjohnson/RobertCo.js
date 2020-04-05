const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;

//console.log("DB URL: " + db_url);
const pool = new Pool({connectionString: db_url});

function getAllAppointments(callback) {
    console.log("First checkpoint");

    var sql = "SELECT id, first, last, phone, email, date, time FROM persons";

    pool.query(sql, function(err, db_result) {
        if (err) {
            throw err;
        } else {
            console.log("Back from the DB with: ");
            console.log(db_result);

            var result = {
                appointments: [
                    {first:"Robert", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"},
                    {first:"Heidi", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"},
                    {first:"Joseph", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"}]};
            callback(result); 
        }       
    });
}

function postNewAppointment(name, callback) {
    var result = {success:true};
    callback(result);
}

module.exports = {
    getAllAppointments: getAllAppointments,
    postNewAppointment: postNewAppointment
}
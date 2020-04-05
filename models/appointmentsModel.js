function getAllAppointments(callback) {
    var result = {
        appointments: [
            {first:"Robert", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"},
            {first:"Heidi", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"},
            {first:"Joseph", last:"Johnson", phone:"111-222-3333", email:"rj@gmail.com", date:"05-02-2020", time:"12:00pm"}
        ]
    }
    callback(result);
}

function postNewAppointment(name, callback) {
    var result = {success:true};
    callback(result);
}

module.exports = {
    getAllAppointments: getAllAppointments,
    postNewAppointment: postNewAppointment
}
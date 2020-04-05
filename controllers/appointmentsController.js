const appointmentsModel = require("../models/appointmentsModel.js");

function getAllAppointments(req, res) {
    console.log("getting all appointments");
    appointmentsModel.getAllAppointments(function(result) {
        res.json(result);
    });   
}

function postAppointment(req, res) {
    var name = req.body.name;
    console.log("Creating new appointment with name" + name);
    appointmentsModel.postNewAppointment(name, function(result) {
        res.json(result);
    });    
}


module.exports = {
    getAllAppointments: getAllAppointments,
    postAppointment: postAppointment
};
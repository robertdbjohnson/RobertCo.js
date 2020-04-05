function LoadAllAppointments() {
    console.log("Loading All Appointments...")
    // var appointment = $("#appointment").val();
    // console.log("Appointment: " + appointment);

    $.get("/appointments", function(data) {
		console.log("Back from the server with:");
		console.log(data);

		for (var i = 0; i < data.appointments.length; i++) {
			var appointment = data.appointments[i];

			$("#ulAppointments").append("<li>" + appointment.first + " " + appointment.last + ": " + appointment.phone + "</li>");
		}

	})
}
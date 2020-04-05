function LoadAllAppointments() {
    console.log("Loading All Appointments...")
    var appointment = $("#appointment").val();
    console.log("Appointment: " + appointment);

    $.get("/appointments", {appointment:appointment}, function(data) {
		console.log("Back from the server with:");
		console.log(data);

		for (var i = 0; i < data.list.length; i++) {
			var appointment = data.list[i];

			$("#ulAppointments").append("<li>" + appointment.first + " " + appointment.last + ": " + appointment.phone + "</li>");
		}

	})
}
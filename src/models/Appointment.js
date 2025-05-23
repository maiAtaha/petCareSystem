class Appointment {
  constructor(appointmentId, petId, clinicId, date, service) {
    this.appointmentId = appointmentId;
    this.petId = petId;
    this.clinicId = clinicId;
    this.date = date;
    this.service = service;
  }
}
module.exports = Appointment;

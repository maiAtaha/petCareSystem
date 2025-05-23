class MedicalRecord {
  constructor(recordId, diagnosis, treatment, prescription, visitDate) {
    this.recordId = recordId;
    this.diagnosis = diagnosis;
    this.treatment = treatment;
    this.prescription = prescription;
    this.visitDate = visitDate;
  }
}
module.exports = MedicalRecord;

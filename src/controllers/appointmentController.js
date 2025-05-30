const { db } = require("../config/firebase");

exports.bookAppointment = async (req, res) => {
    try {
        const { petId, clinicId, ownerId, date, service } = req.body;

        const docRef = await db.collection("Appointment").add({
            petId,
            clinicId,
            ownerId,
            date,
            service,
            status: "upcoming"
        });

        res.status(201).json({ message: "Appointment booked successfully", data:{ id: docRef.id }});
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
};

exports.getAppointmentsByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const snapshot = await db.collection("Appointment").where("ownerId", "==", ownerId).get();
        const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection("Appointment").doc(id).update({ status: "cancelled" });

        res.status(200).json({ message: "Appointment cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling appointment", error: error.message });
    }
};

exports.rescheduleAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { newDate } = req.body;

        await db.collection("Appointment").doc(id).update({ date: newDate });

        res.status(200).json({ message: "Appointment rescheduled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error rescheduling appointment", error: error.message });
    }
};

exports.getNextAppointment = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const snapshot = await db.collection("Appointment")
            .where("ownerId", "==", ownerId)
            .where("status", "==", "upcoming")
            .orderBy("date")
            .limit(1)
            .get();

        if (snapshot.empty) {
            return res.status(200).json({ message: "No upcoming appointments" });
        }

        const doc = snapshot.docs[0];
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: "Error fetching next appointment", error: error.message });
    }
};
exports.getAppointmentsByStatus = async (req, res) => {
    try {
        const { ownerId, status } = req.query;

        if (!ownerId || !status) {
            return res.status(400).json({ message: "Missing ownerId or status" });
        }

        const snapshot = await db.collection("Appointment")
            .where("ownerId", "==", ownerId)
            .where("status", "==", status)
            .get();

        const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }
};
exports.getAppointmentsByPet = async (req, res) => {
    try {
        const { petId } = req.params;

        const snapshot = await db.collection("Appointment")
            .where("petId", "==", petId)
            .get();

        const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pet appointments", error: error.message });
    }
};

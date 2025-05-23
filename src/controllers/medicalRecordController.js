const { db } = require("../config/firebase");

exports.addMedicalRecord = async (req, res) => {
    try {
        const { petId, clinicId, clinicName, date, diagnosis, treatment, notes } = req.body;

        const docRef = await db.collection("MedicalRecord").add({
            petId,
            clinicId,
            clinicName,
            date,
            diagnosis,
            treatment,
            notes
        });

        res.status(201).json({ message: "Medical record added", id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error adding medical record", error: error.message });
    }
};

exports.getMedicalRecordsByPet = async (req, res) => {
    try {
        const { petId } = req.params;

        const snapshot = await db.collection("MedicalRecord").where("petId", "==", petId).get();
        const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medical records", error: error.message });
    }
};

g
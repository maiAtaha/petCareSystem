const { db } = require("../config/firebase");

exports.getClinicProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection("VeterinaryClinic").doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Clinic not found" });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: "Error fetching clinic profile", error: error.message });
    }
};


exports.updateClinicProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        await db.collection("VeterinaryClinic").doc(id).update(updateData);

        res.status(200).json({ message: "Clinic profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating clinic profile", error: error.message });
    }
};
/**
exports.addClinic = async (req, res) => {
    try {
        const { name, address, specialty, phoneNumber, email } = req.body;

        const clinicRef = await db.collection("VeterinaryClinic").add({
            name,
            address,
            specialty,
            phoneNumber,
            email
        });


        // Add to Algolia
        await index.saveObject({
            objectID: clinicRef.id,
            name,
            address,
            specialty,
            phoneNumber,
            email
        });

        res.status(201).json({ message: "Clinic added successfully", id: clinicRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error adding clinic", error: error.message });
    }
};
**/

exports.getClinicsByAddress = async (req, res) => {
    try {
        const { address } = req.params;

        const snapshot = await db.collection("VeterinaryClinic")
            .where("address", "==", address)
            .get();

        const clinics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(clinics.slice(0, 3));
    } catch (error) {
        res.status(500).json({ message: "Error fetching clinics", error: error.message });
    }
};

exports.searchClinics = async (req, res) => {
    try {
        const keyword = req.query.q?.toLowerCase();

        if (!keyword) {
            return res.status(400).json({ message: "Missing search keyword" });
        }

        const snapshot = await db.collection("VeterinaryClinic").get();

        const results = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(clinic =>
                clinic.name?.toLowerCase().includes(keyword) ||
                clinic.address?.toLowerCase().includes(keyword) ||
                clinic.specialty?.toLowerCase().includes(keyword)
            );

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Search error", error: error.message });
    }
};

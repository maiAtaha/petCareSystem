const { db } = require("../config/firebase");

exports.registerClinic = async (req, res) => {
    try {
        const { userName, email, password, phoneNumber, address, showHours } = req.body;
        const clinicRef = await db.collection("VeterinaryClinic").add({
            userName,
            email,
            password,
            phoneNumber,
            address,
            showHours,
        });
        res.status(201).json({ message: "Clinic registered successfully", id: clinicRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error registering clinic", error: error.message });
    }
};

exports.loginClinic = async (req, res) => {
    try {
        const { email, password } = req.body;
        const snapshot = await db.collection("VeterinaryClinic")
            .where("email", "==", email)
            .where("password", "==", password)
            .get();

        if (snapshot.empty) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const clinic = snapshot.docs[0].data();
        res.status(200).json({ message: "Login successful", clinic });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
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

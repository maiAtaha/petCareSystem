const { db } = require("../config/firebase");

exports.registerPetOwner = async (req, res) => {
    try {
        const { userName, email, password, phoneNumber, address } = req.body;
        const ownerRef = await db.collection("PetOwners").add({
            userName,
            email,
            password,
            phoneNumber,
            address,
        });
        res.status(201).json({ message: "Pet Owner registered successfully", id: ownerRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error registering Pet Owner", error: error.message });
    }
};

exports.loginPetOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const snapshot = await db.collection("PetOwners")
            .where("email", "==", email)
            .where("password", "==", password)
            .get();

        if (snapshot.empty) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = snapshot.docs[0].data();
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

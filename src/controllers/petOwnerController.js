const { db } = require("../config/firebase");

exports.getPetOwnerProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection("PetOwner").doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Pet owner not found" });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: "Error fetching pet owner profile", error: error.message });
    }
};
exports.updatePetOwnerProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, phoneNumber, address, image } = req.body;

        const docRef = db.collection("PetOwner").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Pet owner not found" });
        }

        await docRef.update({
            ...(username && { username }),
            ...(email && { email }),
            ...(phoneNumber && { phoneNumber }),
            ...(address && { address }),
            ...(image && { image }),
        });

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating profile", error: error.message });
    }
};

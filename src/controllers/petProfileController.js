const { db } = require("../config/firebase");

exports.addPetProfile = async (req, res) => {
    try {
        const { ownerId,petId, name,birthDate,species, breed,weight, allergies,gender, imageUrl} = req.body;

        const docRef = await db.collection("PetProfile").add({
            ownerId,
            petId,
            name,
            species,
            breed,
            weight,
            allergies,
            birthDate,
            gender,
            imageUrl,
        });

        res.status(201).json({ message: "Pet added successfully", id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error adding pet", error: error.message });
    }
};

exports.getPetProfilesByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const snapshot = await db.collection("PetProfile").where("ownerId", "==", ownerId).get();
        const pets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pets", error: error.message });
    }
};

exports.updatePetProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        await db.collection("PetProfile").doc(id).update(updateData);

        res.status(200).json({ message: "Pet profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating pet", error: error.message });
    }
};


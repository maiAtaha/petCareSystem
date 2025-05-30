const { db } = require("../config/firebase");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.signup = async (req, res) => {
    try {
        const { role, email, password, username, phoneNumber, address , imgUrl } = req.body;

        if (!["petOwner", "veterinaryClinic"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const collectionName = role === "petOwner" ? "PetOwner" : "VeterinaryClinic";

        const existingUser = await db.collection(collectionName).where("email", "==", email).get();
        if (!existingUser.empty) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            email,
            password: hashedPassword,
            username,
            phoneNumber,
            address,
            imgUrl,
            role,
        };

        const docRef = await db.collection(collectionName).add(newUser);

        res.status(201).json({ message: "User registered successfully", user: docRef });
    } catch (error) {
        res.status(500).json({ message: "Signup error", error: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!["petOwner", "veterinaryClinic"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const collectionName = role === "petOwner" ? "PetOwner" : "VeterinaryClinic";

        const snapshot = await db.collection(collectionName).where("email", "==", email).get();
        if (snapshot.empty) {
            return res.status(404).json({ message: "User not found" });
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user: { id: userDoc.id, ...userData } });
    } catch (error) {
        res.status(500).json({ message: "Signin error", error: error.message });
    }
};
exports.logout = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};

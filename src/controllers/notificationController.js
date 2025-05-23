const { db } = require("../config/firebase");

exports.sendNotification = async (req, res) => {
    try {
        const { userId, title, message } = req.body;

        const docRef = await db.collection("Notification").add({
            userId,
            title,
            message,
            timestamp: new Date().toISOString()
        });

        res.status(201).json({ message: "Notification sent", id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error sending notification", error: error.message });
    }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const snapshot = await db.collection("Notification")
            .where("userId", "==", userId)
            .orderBy("timestamp", "desc")
            .get();

        const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection("Notification").doc(id).delete();

        res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notification", error: error.message });
    }
};

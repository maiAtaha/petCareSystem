const { db } = require("../config/firebase");

exports.getClinicNotifications = async (req, res) => {
    try {
        const { clinicId } = req.params;

        const appointmentsSnapshot = await db
            .collection("Appointment")
            .where("clinicId", "==", clinicId)
            .get();

        const notifications = [];

        for (const doc of appointmentsSnapshot.docs) {
            const data = doc.data();

            const petDoc = await db.collection("Pets").doc(data.petId).get();
            const ownerDoc = await db.collection("Users").doc(data.ownerId).get();

            notifications.push({
                petName: petDoc.exists ? petDoc.data().name : "Unknown",
                ownerName: ownerDoc.exists ? ownerDoc.data().name : "Unknown",
                date: data.date,
                service: data.service,
            });
        }

        res.status(200).json({ notifications });

    } catch (error) {
        res.status(500).json({ message: "Error getting clinic notifications", error: error.message });
    }
};
exports.getUserUpcomingNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const now = new Date();
        const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // الآن + 48 ساعة

        const appointmentsSnapshot = await db
            .collection("Appointment")
            .where("ownerId", "==", ownerId)
            .where("status", "==", "upcoming")
            .get();

        const notifications = [];

        for (const doc of appointmentsSnapshot.docs) {
            const data = doc.data();
            const appointmentDate = new Date(data.date);

            if (appointmentDate <= twoDaysLater && appointmentDate >= now) {
                const petDoc = await db.collection("Pets").doc(data.petId).get();

                notifications.push({
                    petName: petDoc.exists ? petDoc.data().name : "Unknown",
                    date: data.date,
                    service: data.service,
                });
            }
        }

        res.status(200).json({ notifications });

    } catch (error) {
        res.status(500).json({ message: "Error getting user notifications", error: error.message });
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

const { db } = require("../config/firebase");

// إضافة مراجعة
exports.addReview = async (req, res) => {
    try {
        const { clinicId, userId, username, rating, comment } = req.body;

        const docRef = await db.collection("Review").add({
            clinicId,
            userId,
            username,
            rating,
            comment,
            timestamp: new Date().toISOString()
        });

        res.status(201).json({ message: "Review added", id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};

// جلب المراجعات لعيادة معينة
exports.getReviewsByClinic = async (req, res) => {
    try {
        const { clinicId } = req.params;

        const snapshot = await db.collection("Review")
            .where("clinicId", "==", clinicId)
            .orderBy("timestamp", "desc")
            .get();

        const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
};

// حذف مراجعة
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection("Review").doc(id).delete();

        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review", error: error.message });
    }
};

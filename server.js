require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();

app.use('/docs', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());


const petOwnerRoutes = require("./src/routes/petOwnerRoutes");
const veterinaryClinicRoutes = require("./src/routes/veterinaryClinicRoutes");
const petProfileRoutes = require("./src/routes/petProfileRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const chatbotRoutes = require("./src/routes/chatbotRoutes");
const communityRoutes = require("./src/routes/communityRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const medicalRecordRoutes = require("./src/routes/medicalRecordRoutes");
const authRoutes = require("./src/routes/authRoutes");


app.use("/api/petOwners", petOwnerRoutes);
app.use("/api/clinics", veterinaryClinicRoutes);
app.use("/api/petProfiles", petProfileRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/medicalRecords", medicalRecordRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());


const petOwnerRoutes = require("./routes/petOwnerRoutes");
const veterinaryClinicRoutes = require("./routes/veterinaryClinicRoutes");
const petProfileRoutes = require("./routes/petProfileRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const communityRoutes = require("./routes/communityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const authRoutes = require("./routes/authRoutes");



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

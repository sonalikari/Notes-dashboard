require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

app.use(cors()); 
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Health / root check
app.get("/", (req, res) => {
    res.json({ message: "Backend running successfully" });
});

// Portfolio data consumed by the frontend
app.get("/api/profile", (req, res) => {
    res.json({
        name: "M. A. Kumawat",
        title: "Full Stack Developer",
        bio: "React frontend + Node backend, deployed on Render.",
        skills: ["JavaScript", "React", "Node.js", "Express"],
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

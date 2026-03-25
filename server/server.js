const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const milestoneRoutes = require("./routes/milestoneRoutes");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// CORS (allow all for now — can restrict later)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

// API Routes
app.get("/api", (req, res) => {
    res.send("API Running");
});

app.use("/api/milestones", milestoneRoutes);

// ✅ OPTIONAL: Serve frontend (if you want single deployment)
if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "../client");

    app.use(express.static(clientPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

// Connect DB and start server
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });
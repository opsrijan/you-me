const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const milestoneRoutes = require("./routes/milestoneRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Allow local front-end (e.g., VS Code Live Server) to call this API.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/milestones", milestoneRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
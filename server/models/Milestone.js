const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
    date: String,
    title: String,
    description: String,
    media: [String],
    position: String
});

module.exports = mongoose.model("Milestone", milestoneSchema);
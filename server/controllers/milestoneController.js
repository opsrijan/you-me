const Milestone = require("../models/Milestone");

exports.getMilestones = async (req, res) => {
    const data = await Milestone.find();
    res.json(data);
};

exports.addMilestone = async (req, res) => {
    const milestone = new Milestone(req.body);
    await milestone.save();
    res.json({ success: true });
};

exports.deleteMilestone = async (req, res) => {
    await Milestone.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};
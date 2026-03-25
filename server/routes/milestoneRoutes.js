const express = require("express");
const router = express.Router();

const {
    getMilestones,
    addMilestone,
    deleteMilestone
} = require("../controllers/milestoneController");

router.get("/", getMilestones);
router.post("/", addMilestone);
router.delete("/:id", deleteMilestone);

module.exports = router;
const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/collaborationSubmissionController");

// Create submission
router.post("/", submissionController.createSubmission);

// Get all submissions
router.get("/", submissionController.getSubmissions);

// Update submission
router.put("/:id", submissionController.updateSubmission);

module.exports = router;

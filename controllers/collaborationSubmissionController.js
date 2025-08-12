const CollaborationSubmission = require("../models/CollaborationSubmission");

// Create submission
exports.createSubmission = async (req, res) => {
  try {
    const submission = new CollaborationSubmission(req.body);
    await submission.save();
    res.status(201).json({ message: "Submission received successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await CollaborationSubmission.find().sort({
      submittedAt: -1,
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update submission status
exports.updateSubmission = async (req, res) => {
  try {
    const submission = await CollaborationSubmission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

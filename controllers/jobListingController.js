const JobListing = require("../models/JobListing");

// Get all job listings
exports.getJobListings = async (req, res) => {
  try {
    const jobs = await JobListing.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new job listing
exports.createJobListing = async (req, res) => {
  const job = new JobListing(req.body);
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a job listing
exports.updateJobListing = async (req, res) => {
  try {
    const updatedJob = await JobListing.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job listing not found" });
    }
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job listing
exports.deleteJobListing = async (req, res) => {
  try {
    const deletedJob = await JobListing.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job listing not found" });
    }
    res.json({ message: "Job listing deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

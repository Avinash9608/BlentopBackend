const express = require("express");
const router = express.Router();
const jobListingController = require("../controllers/jobListingController");

// Job listings routes
router.get("/", jobListingController.getJobListings);
router.post("/", jobListingController.createJobListing);
router.put("/:id", jobListingController.updateJobListing);
router.delete("/:id", jobListingController.deleteJobListing);

module.exports = router;

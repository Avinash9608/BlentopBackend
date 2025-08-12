const express = require("express");
const router = express.Router();
const {
  createInquiry,
  deleteInquiry,
  getInquiries,
} = require("../controllers/inquiryController");

router.post("/", createInquiry); // Save inquiry
router.delete("/:id", deleteInquiry); // Delete inquiry
router.get("/", getInquiries); // Get all inquiries

module.exports = router;

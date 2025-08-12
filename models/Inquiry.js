const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    budget: { type: String, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);

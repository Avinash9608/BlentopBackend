const mongoose = require("mongoose");

const CollaborationSubmissionSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true },
  partnershipType: String,
  platform: String,
  followerCount: String,
  niche: String,
  portfolioLinks: String,
  experience: String,
  proposal: String,
  submittedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "reviewed", "contacted", "rejected"],
    default: "pending",
  },
  notes: String,
});

module.exports = mongoose.model(
  "CollaborationSubmission",
  CollaborationSubmissionSchema
);

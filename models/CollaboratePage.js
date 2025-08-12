const mongoose = require("mongoose");

const CollaboratePageSchema = new mongoose.Schema({
  // Hero Section
  heroTitle: { type: String, default: "" },
  heroSubtitle: { type: String, default: "" },

  // Partnership Opportunities Section
  opportunitiesTitle: { type: String, default: "" },
  opportunitiesSubtitle: { type: String, default: "" },

  // Cards
  cards: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      benefitsTitle: { type: String, default: "Benefits:" },
      benefits: [{ type: String }],
      buttonText: { type: String, default: "Apply Now" },
      buttonLink: { type: String, default: "#" },
    },
  ],

  // Partnership Application Section
  applicationTitle: { type: String, required: true },
  applicationSubtitle: { type: String, required: true },
  formFields: [
    {
      label: { type: String, required: true },
      placeholder: { type: String, required: true },
      type: {
        type: String,
        enum: ["text", "email", "select", "textarea", "number"],
        default: "text",
      },
      required: { type: Boolean, default: false },
      options: [{ type: String }],
    },
  ],
  submitButtonText: { type: String, default: "Submit" },

  // Current Collaborators Section
  collaboratorsTitle: { type: String, required: true },
  collaboratorsSubtitle: { type: String, required: true },
  collaborators: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      stat: { type: String, required: true },
    },
  ],

  // FAQ Section
  faqTitle: { type: String, required: true },
  faqSubtitle: { type: String, required: true },
  faqs: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],

  // SEO
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
CollaboratePageSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("CollaboratePage", CollaboratePageSchema);

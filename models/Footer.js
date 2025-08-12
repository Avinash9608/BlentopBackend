const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  logo: {
    url: { type: String, required: true },
    altText: { type: String, required: true },
    width: { type: Number, default: 150 },
    height: { type: Number, default: 40 },
  },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phoneIcon: { type: String },
    emailIcon: { type: String },
    addressIcon: { type: String },
  },
  products: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  companyLinks: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  supportLinks: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  socialLinks: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
      icon: { type: String },
    },
  ],
  copyrightText: { type: String, required: true },
  developerText: { type: String, required: true },
  ctaSection: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonUrl: { type: String, required: true },
  },
  cookiesBanner: {
    text: { type: String, required: true },
    acceptButtonText: { type: String, required: true },
    learnMoreUrl: { type: String, required: true },
  },
  lastUpdated: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Footer", footerSchema);

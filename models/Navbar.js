const mongoose = require("mongoose");

const NavbarSchema = new mongoose.Schema({
  logo: {
    url: { type: String, required: true },
    altText: { type: String, required: true },
    width: { type: Number, default: 350 },
    height: { type: Number, default: 94 },
  },
  menuItems: [
    {
      text: { type: String, required: true },
      url: { type: String, required: true },
      order: { type: Number },
    },
  ],
  socialLinks: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
      iconClass: { type: String },
    },
  ],
  footerLinks: [
    {
      text: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  copyrightText: { type: String, default: "©2025, Blentops." },
  ctaButton: {
    text: { type: String, default: "Get in Touch" },
    url: { type: String, default: "/contact" },
  },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Navbar", NavbarSchema);

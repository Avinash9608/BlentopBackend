const Footer = require("../models/Footer");

const getOrCreateFooter = async () => {
  let footer = await Footer.findOne().sort({ lastUpdated: -1 });
  if (!footer) {
    footer = new Footer({
      logo: {
        url: "https://blentops-web.inddev.in/wp-content/images/footerlogo.svg",
        altText: "Blentops Logo",
        width: 150,
        height: 40,
      },
      contactInfo: {
        phone: "+916232696232",
        email: "help@publicityposter.com",
        address: "IND Tech Mark Headquarter, Shishwachak, Punpun, Patna",
        phoneIcon: "https://blentops-web.inddev.in/wp-content/images/call.svg",
        emailIcon: "https://blentops-web.inddev.in/wp-content/images/email.svg",
        addressIcon:
          "https://blentops-web.inddev.in/wp-content/images/map_pin.svg",
      },
      products: [
        { name: "Zerogateway", url: "https://zerogateway.com/" },
        { name: "Consider11", url: "#" },
        { name: "CricBlaze", url: "https://www.cricblaze.com/" },
      ],
      companyLinks: [
        { name: "About Us", url: "about.html" },
        { name: "Careers", url: "careers.html" },
        { name: "Investors & Media", url: "investors-and-media.html" },
        { name: "Blog", url: "blog.html" },
      ],
      supportLinks: [
        { name: "Contact", url: "contact-us.html" },
        { name: "Collaborate", url: "collaborate.html" },
        { name: "Privacy Policy", url: "privacy-policy.html" },
        { name: "Terms of Service", url: "terms-of-service.html" },
      ],
      socialLinks: [
        {
          platform: "Linkedin",
          url: "#",
          icon: "https://blentops-web.inddev.in/wp-content/images/icon_arrow-up-white.svg",
        },
        {
          platform: "Twitter",
          url: "#",
          icon: "https://blentops-web.inddev.in/wp-content/images/icon_arrow-up-white.svg",
        },
        {
          platform: "Instagram",
          url: "#",
          icon: "https://blentops-web.inddev.in/wp-content/images/icon_arrow-up-white.svg",
        },
      ],
      copyrightText: "©2025, Blentops. All rights reserved.",
      developerText: "Design & developed by IND Tech Mark",
      ctaSection: {
        title: "Ready to Build the Future Together?",
        description:
          "Join us in creating innovative digital products that make a difference",
        buttonText: "Get in Touch",
        buttonUrl: "#",
      },
      cookiesBanner: {
        text: "We use cookies to offer you a better browsing experience. If you continue to use this site, you consent to our use of cookies.",
        acceptButtonText: "Accept",
        learnMoreUrl: "privacy-policy.html",
      },
    });
    await footer.save();
  }
  return footer;
};

exports.getFooter = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();
    res.json({
      success: true,
      data: footer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch footer data",
      error: error.message,
    });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    const {
      logo,
      contactInfo,
      products,
      companyLinks,
      supportLinks,
      socialLinks,
      copyrightText,
      developerText,
      ctaSection,
      cookiesBanner,
    } = req.body;

    const footer = await getOrCreateFooter();

    // Update all fields
    if (logo) footer.logo = logo;
    if (contactInfo) footer.contactInfo = contactInfo;
    if (products) footer.products = products;
    if (companyLinks) footer.companyLinks = companyLinks;
    if (supportLinks) footer.supportLinks = supportLinks;
    if (socialLinks) footer.socialLinks = socialLinks;
    if (copyrightText) footer.copyrightText = copyrightText;
    if (developerText) footer.developerText = developerText;
    if (ctaSection) footer.ctaSection = ctaSection;
    if (cookiesBanner) footer.cookiesBanner = cookiesBanner;

    footer.lastUpdated = Date.now();
    await footer.save();

    res.json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update footer",
      error: error.message,
    });
  }
};

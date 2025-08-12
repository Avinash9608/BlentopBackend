const Navbar = require("../models/Navbar");

// Helper to get or create navbar
const getOrCreateNavbar = async () => {
  try {
    let navbar = await Navbar.findOne().sort({ lastUpdated: -1 });
    if (!navbar) {
      navbar = new Navbar({
        logo: {
          url: "https://blentops-web.inddev.in/wp-content/images/footerlogo.svg",
          altText: "Company Logo",
          width: 150,
          height: 40,
        },
        menuItems: [],
        socialLinks: [],
        footerLinks: [],
        copyrightText: "©2025, Blentops.",
        ctaButton: {
          text: "Get in Touch",
          url: "/contact",
        },
      });
      await navbar.save();
    }
    return navbar;
  } catch (error) {
    console.error("Error in getOrCreateNavbar:", error);
    throw error;
  }
};

// Save unlimited navigation items
exports.updateNavbar = async (req, res) => {
  try {
    const {
      logo,
      menuItems = [],
      socialLinks = [],
      footerLinks = [],
      copyrightText,
      ctaButton,
    } = req.body;

    // Validate required fields
    if (!logo || !logo.url) {
      return res.status(400).json({
        success: false,
        message: "Logo URL is required",
      });
    }

    const navbar = await getOrCreateNavbar();

    // Update all fields
    navbar.logo = {
      url: logo.url,
      altText: logo.altText || navbar.logo.altText,
      width: logo.width || navbar.logo.width,
      height: logo.height || navbar.logo.height,
    };

    // Update arrays - ensure they're properly set even if empty
    navbar.menuItems = Array.isArray(menuItems) ? menuItems : [];
    navbar.socialLinks = Array.isArray(socialLinks) ? socialLinks : [];
    navbar.footerLinks = Array.isArray(footerLinks) ? footerLinks : [];

    // Update other fields
    navbar.copyrightText = copyrightText || navbar.copyrightText;
    navbar.ctaButton = {
      text: ctaButton?.text || navbar.ctaButton.text,
      url: ctaButton?.url || navbar.ctaButton.url,
    };

    navbar.lastUpdated = Date.now();
    await navbar.save();

    res.json({
      success: true,
      message: "Navbar updated successfully",
      navbar,
    });
  } catch (error) {
    console.error("Error in updateNavbar:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update navbar",
      error: error.message,
    });
  }
};

// Helper function to format URLs
function formatUrl(url, isSocial) {
  if (!url) return "";
  if (isSocial) {
    return url.startsWith("http") ? url : `https://${url}`;
  }
  return url.startsWith("/") ? url : `/${url}`;
}

// Get complete navbar data
exports.getNavbar = async (req, res) => {
  try {
    const navbar = await getOrCreateNavbar();
    res.json({
      success: true,
      data: navbar,
    });
  } catch (error) {
    console.error("Error in getNavbar:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch navbar data",
      error: error.message,
    });
  }
};

// Update navbar (logo, copyright, etc)

// const getOrCreateNavbar = async () => {
//   let navbar = await Navbar.findOne().sort({ lastUpdated: -1 });
//   if (!navbar) {
//     navbar = new Navbar();
//     await navbar.save();
//   }
//   return navbar;
// };
// Helper to get or create navbar with better error handling

// Get complete navbar data
// exports.getNavbar = async (req, res) => {
//   try {
//     const navbar = await getOrCreateNavbar();
//     res.json(navbar);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch navbar data",
//       error: error.message,
//     });
//   }
// };
// Get complete navbar data

// Update navbar (logo, copyright, etc)

// Navbar Links CRUD
exports.createNavbarLink = async (req, res) => {
  try {
    const { text, url } = req.body;
    const navbar = await getOrCreateNavbar();
    console.log("create navbar link");
    navbar.menuItems.push({ text, url, order: navbar.menuItems.length });
    navbar.lastUpdated = Date.now();
    await navbar.save();

    res.status(201).json({
      success: true,
      message: "Navbar link created successfully",
      link: navbar.menuItems[navbar.menuItems.length - 1],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create navbar link",
      error: error.message,
    });
  }
};

exports.updateNavbarLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, url } = req.body;
    const navbar = await getOrCreateNavbar();

    const index = navbar.menuItems.findIndex(
      (item) => item._id.toString() === id
    );
    if (index === -1)
      return res.status(404).json({ message: "Link not found" });

    navbar.menuItems[index] = { ...navbar.menuItems[index], text, url };
    navbar.lastUpdated = Date.now();
    await navbar.save();

    res.json({
      success: true,
      message: "Navbar link updated successfully",
      link: navbar.menuItems[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update navbar link",
      error: error.message,
    });
  }
};

exports.deleteNavbarLink = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await getOrCreateNavbar();

    const index = navbar.menuItems.findIndex(
      (item) => item._id.toString() === id
    );
    if (index === -1)
      return res.status(404).json({ message: "Link not found" });

    navbar.menuItems.splice(index, 1);
    navbar.lastUpdated = Date.now();
    await navbar.save();

    res.json({
      success: true,
      message: "Navbar link deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete navbar link",
      error: error.message,
    });
  }
};

// Social Links CRUD
exports.createSocialLink = async (req, res) => {
  try {
    const { platform, url } = req.body;
    const navbar = await getOrCreateNavbar();

    navbar.socialLinks.push({ platform, url });
    navbar.lastUpdated = Date.now();
    await navbar.save();

    res.status(201).json({
      success: true,
      message: "Social link created successfully",
      link: navbar.socialLinks[navbar.socialLinks.length - 1],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create social link",
      error: error.message,
    });
  }
};

exports.updateSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, url } = req.body;
    const navbar = await getOrCreateNavbar();

    const index = navbar.socialLinks.findIndex(
      (item) => item._id.toString() === id
    );
    if (index === -1)
      return res.status(404).json({ message: "Link not found" });

    navbar.socialLinks[index] = { ...navbar.socialLinks[index], platform, url };
    navbar.lastUpdated = Date.now();
    await navbar.save();

    res.json({
      success: true,
      message: "Social link updated successfully",
      link: navbar.socialLinks[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update social link",
      error: error.message,
    });
  }
};

exports.deleteSocialLink = async (req, res) => {
  try {
    const { id } = req.params;
    const navbar = await getOrCreateNavbar();

    const index = navbar.socialLinks.findIndex(
      (item) => item._id.toString() === id
    );
    if (index === -1)
      return res.status(404).json({ message: "Link not found" });

    navbar.socialLinks.splice(index, 1);
    navbar.lastUpdated = Date.now();
    await navbar.save();

    res.json({
      success: true,
      message: "Social link deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete social link",
      error: error.message,
    });
  }
};

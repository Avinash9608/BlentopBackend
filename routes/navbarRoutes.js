const express = require("express");
const router = express.Router();
const navbarController = require("../controllers/navbarController");

// Add error handling wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Public route to get navbar data
router.get("/", asyncHandler(navbarController.getNavbar));

// Protected routes (frontend will handle auth)
router.post("/", asyncHandler(navbarController.updateNavbar));
router.post("/links", asyncHandler(navbarController.createNavbarLink));
router.put("/links/:id", asyncHandler(navbarController.updateNavbarLink));
router.delete("/links/:id", asyncHandler(navbarController.deleteNavbarLink));
router.post("/social", asyncHandler(navbarController.createSocialLink));
router.put("/social/:id", asyncHandler(navbarController.updateSocialLink));
router.delete("/social/:id", asyncHandler(navbarController.deleteSocialLink));

module.exports = router;

// routes/footerRoutes.js
const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footerController");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get("/", footerController.getFooter);
router.post("/", footerController.updateFooter);

module.exports = router;

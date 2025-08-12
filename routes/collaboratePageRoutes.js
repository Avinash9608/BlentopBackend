const express = require("express");
const router = express.Router();
const collaboratePageController = require("../controllers/collaboratePageController");

// Get page content
router.get("/", collaboratePageController.getPageContent);

// Create or update page content
router.post("/", collaboratePageController.updatePageContent);

// Cards CRUD
router.post("/cards", collaboratePageController.addCard);
router.put("/cards/:cardId", collaboratePageController.updateCard);
router.delete("/cards/:cardId", collaboratePageController.deleteCard);

// Form Fields CRUD
router.post("/form-fields", collaboratePageController.addFormField);
router.put("/form-fields/:fieldId", collaboratePageController.updateFormField);
router.delete(
  "/form-fields/:fieldId",
  collaboratePageController.deleteFormField
);

// Collaborators CRUD
router.post("/collaborators", collaboratePageController.addCollaborator);
router.put(
  "/collaborators/:collaboratorId",
  collaboratePageController.updateCollaborator
);
router.delete(
  "/collaborators/:collaboratorId",
  collaboratePageController.deleteCollaborator
);

// FAQs CRUD
router.post("/faqs", collaboratePageController.addFaq);
router.put("/faqs/:faqId", collaboratePageController.updateFaq);
router.delete("/faqs/:faqId", collaboratePageController.deleteFaq);

module.exports = router;

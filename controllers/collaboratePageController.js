const CollaboratePage = require("../models/CollaboratePage");

// Get page content
exports.getPageContent = async (req, res) => {
  try {
    let pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      // Create a new document with all required fields
      pageContent = new CollaboratePage({
        heroTitle: "Default Hero Title",
        heroSubtitle: "Default Hero Subtitle",
        opportunitiesTitle: "Default Opportunities Title",
        opportunitiesSubtitle: "Default Opportunities Subtitle",
        applicationTitle: "Default Application Title",
        applicationSubtitle: "Default Application Subtitle",
        submitButtonText: "Submit",
        collaboratorsTitle: "Default Collaborators Title",
        collaboratorsSubtitle: "Default Collaborators Subtitle",
        faqTitle: "Default FAQ Title",
        faqSubtitle: "Default FAQ Subtitle",
        cards: [],
        formFields: [],
        collaborators: [],
        faqs: [],
      });
      await pageContent.save();
    }

    res.json(pageContent);
  } catch (err) {
    console.error("Error in getPageContent:", err);
    res.status(500).json({ message: err.message });
  }
};

// Create or update page content
exports.updatePageContent = async (req, res) => {
  try {
    let pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      // If no document exists, create one with default values
      pageContent = new CollaboratePage({
        ...req.body,
        // Ensure required fields have defaults if not provided
        heroTitle: req.body.heroTitle || "Default Hero Title",
        heroSubtitle: req.body.heroSubtitle || "Default Hero Subtitle",
        opportunitiesTitle:
          req.body.opportunitiesTitle || "Default Opportunities Title",
        opportunitiesSubtitle:
          req.body.opportunitiesSubtitle || "Default Opportunities Subtitle",
        applicationTitle:
          req.body.applicationTitle || "Default Application Title",
        applicationSubtitle:
          req.body.applicationSubtitle || "Default Application Subtitle",
        submitButtonText: req.body.submitButtonText || "Submit",
        collaboratorsTitle:
          req.body.collaboratorsTitle || "Default Collaborators Title",
        collaboratorsSubtitle:
          req.body.collaboratorsSubtitle || "Default Collaborators Subtitle",
        faqTitle: req.body.faqTitle || "Default FAQ Title",
        faqSubtitle: req.body.faqSubtitle || "Default FAQ Subtitle",
      });
    } else {
      // Update existing document
      Object.assign(pageContent, req.body);
    }

    await pageContent.save();
    res.json(pageContent);
  } catch (err) {
    console.error("Error in updatePageContent:", err);
    res.status(400).json({ message: err.message });
  }
};

// Add a new card
exports.addCard = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({
        message: "Title, description and image are required",
      });
    }

    let pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      // If no document exists, create one with this card
      pageContent = new CollaboratePage({
        ...defaultPageContent(),
        cards: [req.body],
      });
    } else {
      // Add card to existing document
      pageContent.cards.push(req.body);
    }

    await pageContent.save();
    res.status(201).json(pageContent.cards);
  } catch (err) {
    console.error("Error in addCard:", err);
    res.status(400).json({ message: err.message });
  }
};

// Helper function for default page content
function defaultPageContent() {
  return {
    heroTitle: "Default Hero Title",
    heroSubtitle: "Default Hero Subtitle",
    opportunitiesTitle: "Default Opportunities Title",
    opportunitiesSubtitle: "Default Opportunities Subtitle",
    applicationTitle: "Default Application Title",
    applicationSubtitle: "Default Application Subtitle",
    submitButtonText: "Submit",
    collaboratorsTitle: "Default Collaborators Title",
    collaboratorsSubtitle: "Default Collaborators Subtitle",
    faqTitle: "Default FAQ Title",
    faqSubtitle: "Default FAQ Subtitle",
    cards: [],
    formFields: [],
    collaborators: [],
    faqs: [],
  };
}

// Update a card
exports.updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    const cardIndex = pageContent.cards.findIndex(
      (card) => card._id.toString() === cardId
    );
    if (cardIndex === -1) {
      return res.status(404).json({ message: "Card not found" });
    }

    Object.assign(pageContent.cards[cardIndex], req.body);
    await pageContent.save();
    res.json(pageContent.cards[cardIndex]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a card
exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    pageContent.cards = pageContent.cards.filter(
      (card) => card._id.toString() !== cardId
    );
    await pageContent.save();
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a new form field
exports.addFormField = async (req, res) => {
  try {
    let pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      pageContent = new CollaboratePage({
        formFields: [req.body],
      });
    } else {
      pageContent.formFields.push(req.body);
    }

    await pageContent.save();
    res.json(pageContent.formFields);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a form field
exports.updateFormField = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    const fieldIndex = pageContent.formFields.findIndex(
      (field) => field._id.toString() === fieldId
    );
    if (fieldIndex === -1) {
      return res.status(404).json({ message: "Field not found" });
    }

    Object.assign(pageContent.formFields[fieldIndex], req.body);
    await pageContent.save();
    res.json(pageContent.formFields[fieldIndex]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a form field
exports.deleteFormField = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    pageContent.formFields = pageContent.formFields.filter(
      (field) => field._id.toString() !== fieldId
    );
    await pageContent.save();
    res.json({ message: "Field deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a new collaborator
exports.addCollaborator = async (req, res) => {
  try {
    let pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      pageContent = new CollaboratePage({
        collaborators: [req.body],
      });
    } else {
      pageContent.collaborators.push(req.body);
    }

    await pageContent.save();
    res.json(pageContent.collaborators);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a collaborator
exports.updateCollaborator = async (req, res) => {
  try {
    const { collaboratorId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    const collaboratorIndex = pageContent.collaborators.findIndex(
      (collaborator) => collaborator._id.toString() === collaboratorId
    );

    if (collaboratorIndex === -1) {
      return res.status(404).json({ message: "Collaborator not found" });
    }

    Object.assign(pageContent.collaborators[collaboratorIndex], req.body);
    await pageContent.save();
    res.json(pageContent.collaborators[collaboratorIndex]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a collaborator
exports.deleteCollaborator = async (req, res) => {
  try {
    const { collaboratorId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    pageContent.collaborators = pageContent.collaborators.filter(
      (collaborator) => collaborator._id.toString() !== collaboratorId
    );
    await pageContent.save();
    res.json({ message: "Collaborator deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a new FAQ
exports.addFaq = async (req, res) => {
  try {
    let pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      pageContent = new CollaboratePage({
        faqs: [req.body],
      });
    } else {
      pageContent.faqs.push(req.body);
    }

    await pageContent.save();
    res.json(pageContent.faqs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a FAQ
exports.updateFaq = async (req, res) => {
  try {
    const { faqId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    const faqIndex = pageContent.faqs.findIndex(
      (faq) => faq._id.toString() === faqId
    );
    if (faqIndex === -1) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    Object.assign(pageContent.faqs[faqIndex], req.body);
    await pageContent.save();
    res.json(pageContent.faqs[faqIndex]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a FAQ
exports.deleteFaq = async (req, res) => {
  try {
    const { faqId } = req.params;
    const pageContent = await CollaboratePage.findOne().sort({ createdAt: -1 });

    if (!pageContent) {
      return res.status(404).json({ message: "Page content not found" });
    }

    pageContent.faqs = pageContent.faqs.filter(
      (faq) => faq._id.toString() !== faqId
    );
    await pageContent.save();
    res.json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

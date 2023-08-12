const express = require("express");
const { validateBody } = require("../middlewares/validateBody");
const { middlewareAuth } = require("../middlewares/authMiddlewares");
const {
  getContacts,
  postContact,
  deleteContact,
} = require("../controllers/contactsControllers");
const { postContactSchema } = require("../joiShemas/contactSchemas");
const { validateId } = require("../middlewares/validateID");

const router = express.Router();

router.get("/", middlewareAuth, getContacts);

router.post("/", middlewareAuth, validateBody(postContactSchema), postContact);

router.delete("/:contactId", middlewareAuth, validateId, deleteContact);

router.put("/:contactId");

module.exports = router;

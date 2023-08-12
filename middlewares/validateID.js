const { isValidObjectId } = require("mongoose");

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    res.status(400).json({ message: "ID is not valid" });
    return;
  }
  next();
};

module.exports = { validateId };

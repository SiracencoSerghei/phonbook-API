const Contact = require("../db/models/contactModel");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.find({ owner });
  res.json(contacts);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ owner, ...req.body });
  // console.log(newContact)
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const user = await Contact.findByIdAndDelete(contactId);
  if (!user) {
    res.status(404).json({ message: "contact not found" });
    return;
  }
  res.json({ message: "contact deleted successfully" });
};

module.exports = { getContacts, postContact, deleteContact };

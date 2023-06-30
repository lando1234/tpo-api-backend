const ContactosService = require("../services/contactos.service");

let instance = null;

class ContactosController {
  static getInstance() {
    if (!instance) {
      return new ContactosController();
    }
    return instance;
  }

  async getContacts(req, res) {
    try {
      const contacts = await ContactosService.getContactos();
      return res.status(200).json(contacts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getContacts",
        message: err,
      });
    }
  }

  async createContact(req, res) {
    try {
      const { contact } = req.body;
      console.log(contact);
      let isRegistered = await ContactosService.isContactRegistered(
        contact.email
      );
      if (!isRegistered) {
        let newContact = await ContactosService.createContact(contact);

        return res.status(201).json({
          message: "Created!",
          contact: newContact,
        });
      }
      return res.status(400).json({
        message: "The contact is already registered",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createContact",
        message: err.message,
      });
    }
  }
}

module.exports = new ContactosController();

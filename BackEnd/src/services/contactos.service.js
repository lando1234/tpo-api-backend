const ContactosModel = require("../models/Contactos");

class ContactosService {
  async getContactos() {
    try {
      const contacts = await ContactosModel.find();
      return contacts;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getContactos Servise");
    }
  }

  async isContactRegistered(email) {
    try {
      let contact = await ContactosModel.exists({ email });
      if (contact) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getContactByEmail");
    }
  }

  async createContact(contact) {
    try {
      let savedContact = await ContactosModel.create(contact);
      return savedContact;
    } catch (err) {
      console.error(err);
      throw new Error("Error in createContact Service", err);
    }
  }
}

module.exports = new ContactosService();

const ContactosModel = require ('../models/Contactos');

class ContactosService {
    async getContactos(){
        try{
            const contacts = await ContactosModel.find();
            return contacts;
        }   catch (err) {
            console.error(err);
            throw new Error("Error in getContactos Servise");
        }
    }

    async getContactosById(id) {
        try {
            let contact = await ContactosModel.findOne({_id:id});
            return contact;
        }   catch (err){
            console.error(err);
            throw new Error("Error in getContactosById");
        }
    }

    async getContactosByEmail(email){
        try{
            let contact = await ContactosModel.find({ categoria: email });
            return contact;
        }   catch (err){
            console.error(err);
            throw new Error("Error in getContactosByNombre");
        }
    }

    async isContactRegistered(email){
        try{
            let contact = await ContactosModel.exists({ email });
            if(contact){
                return true;
            }
            return false;
        }   catch (err){
            console.error(err);
            throw new Error("Error in getContactByEmail");
        }
    }

    async createContact(contact){
        try {
            let savedContact = await ContactosModel.create(contact);
            return savedContact
        }   catch (err){
            console.error(err);
            throw new Error("Error in createContact Service",err);
        }
    }

    async updateContact(id, fields, contact){
        try {
            fields.nombre ? contact.nombre = fields.nombre : false;
            fields.email ? contact.email = fields.email : false;
            fields.descripcion ? contact.descripcion = fields.descripcion : false;

            await ContactosModel.findOneAndUpdate({_id:id}, contact);
            return contact;
        }   catch (err){
            console.error(err);
            throw new Error("Error in updateContact Service");
        }
    }

    async deleteContact(id){
        try {
            await ContactosModel.findOneAndDelete({_id:id});
        }   catch (err){
            console.error(err);
            throw new Error("Error in delete Service");
        }
    }
}

module.exports = new ContactosService();
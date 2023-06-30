const { Router } = require("express");
const contactosController = require("../controllers/contactos.controller");

const checkFields = require("../middlewares/validateFields");
const { check } = require("express-validator");

const router = Router();

router.get("/", [checkFields], contactosController.getContacts); //GET CONTACTS

router.post(
  "/",
  [
    check("contact.nombre").not().isEmpty(),
    check("contact.email").not().isEmpty(),
    check("contact.descripcion").not().isEmpty(),
    check("contact.telefono").not().isEmpty(),

    checkFields,
  ],
  contactosController.createContact
); //POST CONTACTS

module.exports = router;

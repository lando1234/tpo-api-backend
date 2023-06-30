const UsuariosModel = require("../models/Usuarios");
const bcrypt = require("bcrypt");

class UsuariosService {
  async getUserByEmail(email) {
    try {
      let user = await UsuariosModel.findOne({ email });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserById Service");
    }
  }
}

module.exports = new UsuariosService();

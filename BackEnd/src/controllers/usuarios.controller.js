let instance = null;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UsuariosService = require("../services/usuarios.service");
const AuthService = require("../services/auth.service");

class UsuariosController {
  static getInstance() {
    if (!instance) {
      return new UsuariosController();
    }
    return instance;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let isUserRegistered = await AuthService.hasValidCredentials(
        email,
        password
      );
      if (isUserRegistered) {
        const user = await UsuariosService.getUserByEmail(email);

        const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          status: 200,
          token,
          message: "Token created successfully.",
        });
      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "login",
        message: err.message,
      });
    }
  }
}

module.exports = UsuariosController.getInstance();

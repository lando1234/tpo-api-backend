require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const { dbConnection } = require("./src/db/config");

const app = express();
app.use(cors());
dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "You are connected to the project" });
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/contactos", require("./src/routes/contactos.routes"));
app.use("/api/usuarios", require("./src/routes/usuarios.routes"));

app.listen(process.env.PORT, () => {
  console.log("app listening on PORT: " + process.env.PORT);
});

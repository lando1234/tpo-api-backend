const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./server.js",
  "./src/routes/contactos.routes.js",
  "./src/routes/Usuarios.routes.js",
];

swaggerAutogen(outputFile, endpointsFiles);

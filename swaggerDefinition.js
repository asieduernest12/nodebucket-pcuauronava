const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

/** @type {swaggerJsdoc.Options} */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  apis: ["./server/routes*.js"], // files containing annotations as above
};

const initSwagger = (app) => {
    
    //   const swaggerDocument = swaggerJsdoc(options);
  const swaggerDocument = require("./swagger.json");


  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
};
module.exports = initSwagger;

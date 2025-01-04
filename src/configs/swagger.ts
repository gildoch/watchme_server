const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API Watchme',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Watchme',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos com as anotações do JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;

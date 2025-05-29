// generate-swagger.js
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.5',
        },
        servers: [
            { url: 'https://api.docai.online/' },
        ],
    },
    apis: [path.resolve(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('✅ Swagger spec generated: swagger.json');

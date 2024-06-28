import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


import { errorHandler } from './middleware/errorHandler';
import baseRoutes from './routes/baseRoutes';

dotenv.config({ path: __dirname + '/.env' });
const app = express();
const port = process.env.PORT || 3000;
const apiPrefix = process.env.API_PREFIX || '/api/v1';

app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'nodejs-base-backend',
      version: '1.0.0',
      description: 'Base structure for various backend projects using NodeJS and TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());

app.use(apiPrefix, baseRoutes);

/*app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../frontend/dist/index.html'));
});
*/

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});

export default app;
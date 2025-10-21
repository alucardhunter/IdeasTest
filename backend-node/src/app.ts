import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';
import ideasRouter from './routes/ideas';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// serve swagger UI if swagger.yaml exists (swagger.yaml is in the repository root)
const swaggerPath = path.join(__dirname, '..', 'swagger.yaml');
if (fs.existsSync(swaggerPath)) {
  const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');
  const swaggerDoc = YAML.parse(swaggerFile);
  // expose raw YAML at /api/swagger.yaml
  app.get('/api/swagger.yaml', (req, res) => res.type('text/yaml').send(swaggerFile));
  // expose interactive UI at /api/docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

app.use('/ideas', ideasRouter);
app.get('/users', async (req, res) => {
  const prisma = (await import('./prismaClient')).default;
  const users = await prisma.user.findMany();
  res.json(users);
});

export default app;

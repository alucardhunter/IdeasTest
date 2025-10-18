import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ideasRouter from './routes/ideas';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/ideas', ideasRouter);
app.get('/users', async (req, res) => {
  const prisma = (await import('./prismaClient')).default;
  const users = await prisma.user.findMany();
  res.json(users);
});

export default app;

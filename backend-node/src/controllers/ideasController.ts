import { Request, Response } from 'express';
import prisma from '../prismaClient';

export async function listIdeas(req: Request, res: Response) {
  const ideas = await prisma.idea.findMany({
    include: {
      votes: true,
      comments: true,
      creator: true
    }
  });

  const ideasWithCount = ideas.map(i => ({
    ...i,
    votesCount: i.votes.length
  }));

  ideasWithCount.sort((a, b) => b.votesCount - a.votesCount);

  res.json(ideasWithCount);
}

export async function createIdea(req: Request, res: Response) {
  const { title, description, createdBy } = req.body;
  if (!title || !description || !createdBy) return res.status(400).json({ error: 'Parâmetros incompletos' });

  const idea = await prisma.idea.create({
    data: { title, description, createdBy }
  });
  res.status(201).json(idea);
}

export async function getIdea(req: Request, res: Response) {
  const id = Number(req.params.id);
  const idea = await prisma.idea.findUnique({
    where: { id },
    include: { votes: true, comments: { include: { user: true } } }
  });
  if (!idea) return res.status(404).json({ error: 'Ideia não encontrada' });

  res.json({
    ...idea,
    votesCount: idea.votes.length
  });
}

export async function voteIdea(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId obrigatório' });

  try {
    const vote = await prisma.vote.create({
      data: { ideaId: id, userId }
    });
    res.status(201).json(vote);
  } catch (err: any) {
    if (err?.code === 'P2002') return res.status(400).json({ error: 'Usuário já votou nesta ideia ou requisição inválida!' });
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
}

export async function addComment(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId, message } = req.body;
  if (!userId || !message) return res.status(400).json({ error: 'userId e message obrigatórios' });

  const comment = await prisma.comment.create({
    data: { ideaId: id, userId, message }
  });
  res.status(201).json(comment);
}

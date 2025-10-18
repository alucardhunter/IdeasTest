"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listIdeas = listIdeas;
exports.createIdea = createIdea;
exports.getIdea = getIdea;
exports.voteIdea = voteIdea;
exports.addComment = addComment;
const prismaClient_1 = __importDefault(require("../prismaClient"));
async function listIdeas(req, res) {
    const ideas = await prismaClient_1.default.idea.findMany({
        include: {
            votes: true,
            comments: true,
        }
    });
    const ideasWithCount = ideas.map(i => ({
        ...i,
        votesCount: i.votes.length
    }));
    ideasWithCount.sort((a, b) => b.votesCount - a.votesCount);
    res.json(ideasWithCount);
}
async function createIdea(req, res) {
    const { title, description, createdBy } = req.body;
    if (!title || !description || !createdBy)
        return res.status(400).json({ error: 'missing fields' });
    const idea = await prismaClient_1.default.idea.create({
        data: { title, description, createdBy }
    });
    res.status(201).json(idea);
}
async function getIdea(req, res) {
    const id = Number(req.params.id);
    const idea = await prismaClient_1.default.idea.findUnique({
        where: { id },
        include: { votes: true, comments: { include: { user: true } } }
    });
    if (!idea)
        return res.status(404).json({ error: 'Idea not found' });
    res.json({
        ...idea,
        votesCount: idea.votes.length
    });
}
async function voteIdea(req, res) {
    const id = Number(req.params.id);
    const { userId } = req.body;
    if (!userId)
        return res.status(400).json({ error: 'userId required' });
    try {
        const vote = await prismaClient_1.default.vote.create({
            data: { ideaId: id, userId }
        });
        res.status(201).json(vote);
    }
    catch (err) {
        if (err?.code === 'P2002')
            return res.status(400).json({ error: 'User already voted for this idea' });
        console.error(err);
        res.status(500).json({ error: 'internal' });
    }
}
async function addComment(req, res) {
    const id = Number(req.params.id);
    const { userId, message } = req.body;
    if (!userId || !message)
        return res.status(400).json({ error: 'userId and message required' });
    const comment = await prismaClient_1.default.comment.create({
        data: { ideaId: id, userId, message }
    });
    res.status(201).json(comment);
}

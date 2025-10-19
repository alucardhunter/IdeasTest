export type User = { id: number; name: string; email: string };
export type Idea = { id: number; title: string; description: string; createdBy: number; creator: User; createdAt: string; votesCount?: number; comments?: Comment[] };
export type Comment = { id: number; ideaId: number; userId: number; message: string; createdAt: string; user?: User };

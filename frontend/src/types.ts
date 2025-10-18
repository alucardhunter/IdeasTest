export type User = { id: number; name: string; email: string };
export type Idea = { id:number; title:string; description:string; createdBy:number; createdAt:string; votesCount?: number };
export type Comment = { id:number; ideaId:number; userId:number; message:string; createdAt:string; user?: User };

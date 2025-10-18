import axios from 'axios';
import type { Idea, Comment, User } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const api = axios.create({ baseURL: API_BASE });

export const getIdeas = () => api.get<Idea[]>('/ideas').then(r=>r.data);
export const createIdea = (payload:{title:string,description:string,createdBy:number}) => api.post('/ideas',payload).then(r=>r.data);
export const getIdea = (id:number) => api.get<Idea>(`/ideas/${id}`).then(r=>r.data);
export const voteIdea = (id:number,userId:number) => api.post(`/ideas/${id}/vote`,{ userId }).then(r=>r.data);
export const addComment = (id:number,payload:{userId:number,message:string}) => api.post(`/ideas/${id}/comments`,payload).then(r=>r.data);
export const getUsers = () => api.get<User[]>('/users').then(r=>r.data);

export default api;

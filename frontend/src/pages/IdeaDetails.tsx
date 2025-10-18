import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIdea, addComment, getUsers } from '../api/api'
import type { Comment, Idea, User } from '../types'

export default function IdeaDetails(){
  const { id } = useParams();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number|undefined>();

  useEffect(()=>{
    load();
    getUsers().then(setUsers);
  },[])

  async function load(){
    if(!id) return;
    const data:any = await getIdea(Number(id));
    setIdea(data);
    setComments(data.comments ?? []);
  }

  async function onAddComment(e:React.FormEvent){
    e.preventDefault();
    if(!id || !userId) return alert('Selecione usuário e mensagem');
    await addComment(Number(id), { userId, message });
    setMessage('');
    await load();
  }

  if(!idea) return <div>Carregando...</div>

  return (
    <div>
      <h1>{idea.title}</h1>
      <p>{idea.description}</p>
      <p>Votos: {idea.votesCount ?? 0}</p>

      <h3>Comentários</h3>
      <ul>
        {comments.map(c=> (
          <li key={c.id}><b>{c.user?.name ?? c.userId}:</b> {c.message}</li>
        ))}
      </ul>

      <form onSubmit={onAddComment}>
        <div>
          <select onChange={e=>setUserId(Number(e.target.value))}>
            <option value="">-- selecione usuário --</option>
            {users.map(u=> <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} />
        </div>
        <button type="submit">Comentar</button>
      </form>
    </div>
  )
}

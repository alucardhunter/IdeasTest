import React, { useEffect, useState } from 'react'
import { getIdeas, voteIdea } from '../api/api'
import type { Idea } from '../types'
import { useNavigate } from 'react-router-dom'

export default function Home(){
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{ load() },[])
  async function load(){
    const data = await getIdeas();
    setIdeas(data as any);
  }

  async function onVote(id:number){
    try{
      await voteIdea(id, 1);
      await load();
    }catch(e:any){
      alert(e?.response?.data?.error || 'Erro ao votar')
    }
  }

  return (
    <div>
      <h1>Ideias</h1>
      <ul>
        {ideas.map(i=> (
          <li key={i.id} style={{ marginBottom: 12 }}>
            <a onClick={()=>navigate(`/ideas/${i.id}`)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>{i.title}</a>
            <div>{i.description}</div>
            <div>Votos: {i.votesCount ?? 0}</div>
            <button onClick={()=>onVote(i.id)}>Votar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { getUsers, createIdea } from '../api/api'
import { useNavigate } from 'react-router-dom'
import type { User } from '../types'

export default function NewIdea(){
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState<number|undefined>();
  const navigate = useNavigate();

  useEffect(()=>{ getUsers().then(setUsers) },[])

  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    if(!createdBy) return alert('Selecione um usuário');
    try{
      await createIdea({ title, description, createdBy });
      navigate('/');
    }catch(e:any){
      alert('Erro ao criar ideia');
    }
  }

  return (
    <div>
      <h1>Nova Ideia</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Título</label><br />
          <input value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div>
          <label>Descrição</label><br />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div>
          <label>Usuário</label><br />
          <select onChange={e=>setCreatedBy(Number(e.target.value))}>
            <option value="">-- selecione --</option>
            {users.map(u=> <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  )
}

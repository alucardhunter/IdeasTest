import React, { useEffect, useState } from 'react'
import { getIdeas, voteIdea } from '../api/api'
import type { Idea } from '../types'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import IdeaCard from '../components/IdeaCard'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import ErrorModal from '../components/ErrorModal'
import { useUser } from '../context/UserContext'

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const { currentUser } = useUser();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const data = await getIdeas();
      setIdeas(data as any);
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || 'Erro ao carregar ideias');
    }
  }

  async function onVote(id: number) {
    try {
      if (!currentUser) return setError('Você deve selecionar um usuário');;
      await voteIdea(id, currentUser.id);
      await load();
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.error || 'Erro ao votar');
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {ideas.map(i => (
          <Grid item xs={12} sm={6} md={4} key={i.id}>
            <IdeaCard idea={i} onVote={onVote} />
          </Grid>
        ))}
      </Grid>

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', right: 24, bottom: 24 }} onClick={() => navigate('/new')}>
        <AddIcon />
      </Fab>
      <ErrorModal open={!!error} message={error || ''} onClose={() => setError(null)} />
    </Box>
  )
}

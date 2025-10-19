import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { getIdea, addComment } from '../api/api'
import ErrorModal from '../components/ErrorModal';
import { useUser } from '../context/UserContext'
import type { Comment, Idea } from '../types'
import { motion } from 'framer-motion'

export default function IdeaDetails() {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, [])

  async function load() {
    if (!id) return;
    const data: any = await getIdea(Number(id));
    setIdea(data);
    setComments(data.comments ?? []);
  }

  async function onAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !currentUser || !message) return setError('Selecione usuário e mensagem válidos');
    await addComment(Number(id), { userId: currentUser.id, message });
    setMessage('');
    await load();
  }

  if (!idea) return <div>Carregando...</div>

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>{idea.title}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{idea.description}</Typography>
        <Typography variant="subtitle1">Votos: {idea.votesCount ?? 0}</Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>Comentários</Typography>
        <List>
          {comments.map(c => (
            <ListItem key={c.id}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{c.user?.name?.charAt(0) ?? c.userId}</Avatar>
                <Box>
                  <Typography variant="subtitle2">{c.user?.name ?? c.userId}</Typography>
                  <Typography variant="body2">{c.message}</Typography>
                </Box>
              </Stack>
            </ListItem>
          ))}
        </List>

        <Box component="form" onSubmit={onAddComment} sx={{ mt: 2 }}>
          <TextField label="Mensagem" fullWidth multiline minRows={3} value={message} onChange={e => setMessage(e.target.value)} sx={{ mb: 2 }} />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="contained" type="submit">Comentar</Button>
          </motion.div>
        </Box>

        <ErrorModal open={!!error} message={error || ''} onClose={() => setError(null)} />
      </Box>
    </motion.div>
  )
}

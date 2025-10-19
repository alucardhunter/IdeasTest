import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Stack from '@mui/material/Stack'
import type { Idea } from '../types'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

export default function IdeaCard({ idea, onVote }: { idea: Idea, onVote: (id: number) => void }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ cursor: 'pointer' }} onClick={() => navigate(`/ideas/${idea.id}`)}>
          {idea.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {idea.description}
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row' }}>
          <Typography variant="caption">
            Proposto por: &nbsp;
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {idea.creator?.name || 'Usuário desconhecido'}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <ThumbUpIcon fontSize="small" />
            <Typography variant="subtitle2">{idea.votesCount ?? 0}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <ChatBubbleOutlineIcon fontSize="small" />
            <Typography variant="subtitle2">{idea.comments?.length ?? 0}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<ThumbUpIcon />} onClick={() => onVote(idea.id)}>Votar</Button>
        <Button size="small" onClick={() => navigate(`/ideas/${idea.id}`)}>Ver detalhes</Button>
      </CardActions>
    </Card>
  )
}

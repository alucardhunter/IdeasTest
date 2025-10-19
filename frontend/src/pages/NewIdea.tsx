import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import ErrorModal from '../components/ErrorModal';
import { createIdea } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function NewIdea() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useUser();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(currentUser)
    try {
      await createIdea({
        title,
        description,
        createdBy: currentUser.id,
      });
      setTitle('');
      setDescription('');
      navigate('/');
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || 'Erro ao criar ideia');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" mb={2}>Nova Ideia</Typography>
        <TextField
          fullWidth
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Descrição"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </motion.div>
        <ErrorModal open={!!error} message={error || ''} onClose={() => setError(null)} />
      </Box>
    </motion.div>
  );
}
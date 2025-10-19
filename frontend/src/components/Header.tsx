import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getUsers } from '../api/api';
import type { User } from '../types';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '@mui/material/styles';

export default function Header() {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const { updateUser, currentUser } = useUser();

  useEffect(() => {
    getUsers().then(u => {
      setUsers(u);
      updateUser(u[0] || null);
    });
  }, []);

  function handleChange(e: any) {
    const id = Number(e.target.value);
    const u = users.find(x => x.id === id) || null;
    updateUser(u);
  }

  return (
    <AppBar position="static" color="inherit">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton component={RouterLink} to='/'><HomeIcon /></IconButton>
          <Typography variant="h6" component={RouterLink} to='/' sx={{ display: { xs: 'none', sm: 'unset' }, textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
            Catálogo Colaborativo de Ideias
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {currentUser && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar>{currentUser.name.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle2">Bem vindo,</Typography>
                <Typography variant="h6" sx={{ lineHeight: 1 }}>{currentUser.name}</Typography>
              </Box>
            </Box>
          )}

          <FormControl variant="standard" sx={{ minWidth: 160 }}>
            <InputLabel id="user-select-label">Usuário</InputLabel>
            <Select
              labelId="user-select-label"
              value={currentUser?.id ?? ''}
              onChange={handleChange}
              label="Usuário">
              {users.map(u => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

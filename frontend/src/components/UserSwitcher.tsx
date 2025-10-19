import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Typography, Box } from '@mui/material';
import { useUser } from '../context/UserContext';
import { getUsers } from '../api/api';
import { User } from '../types';

export default function UserSwitcher() {
  const [users, setUsers] = useState<User[]>([]);
  const { currentUser, updateUser } = useUser();

  useEffect(() => {
    getUsers().then(res => {
      setUsers(res);
      if (!currentUser && res.length > 0) {
        updateUser(res[0]);
      }
    });
  }, []);

  const handleChange = (e: any) => {
    const user = users.find((u: any) => u.id === e.target.value);
    updateUser(user);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
        Bem vindo, {currentUser?.name || 'Usuário'}
      </Typography>
      <Select value={currentUser?.id || ''} onChange={handleChange}>
        {users.map((user: any) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
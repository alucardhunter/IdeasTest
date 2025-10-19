import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grow } from '@mui/material';

interface ErrorModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ open, message, onClose }: ErrorModalProps) {
  return (
    <Grow in={open} timeout={300}>
      <div>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Erro</DialogTitle>
          <DialogContent>
            <Typography>{message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="contained" color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Grow>
  );
}
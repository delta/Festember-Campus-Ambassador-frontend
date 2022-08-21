import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ToastProps } from './types';

export default function Toast({
  toastOpen,
  toastMessage,
  toastSeverity,
  handleToastClose,
}: ToastProps) {
  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={6000}
      onClose={handleToastClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert
        onClose={handleToastClose}
        severity={toastSeverity}
        sx={{ width: '100%' }}
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}

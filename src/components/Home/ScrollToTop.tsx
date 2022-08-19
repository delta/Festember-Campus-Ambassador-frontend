import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';

export function ScrollToTop() {
  useEffect(() => {
    useScrollToTop();
  }, []);
  return (
    <div style={{ marginBottom: '5rem' }}>
      <IconButton
        color="primary"
        style={{ position: 'absolute', right: '20px' }}
        onClick={useScrollToTop}
      >
        <NorthIcon  sx={{ fontSize: 50 }} />
      </IconButton>
    </div>
  );
}

export function useScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

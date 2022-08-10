import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div style={{ marginBottom: '5rem' }}>
      <IconButton
        color="primary"
        style={{ position: 'absolute', right: '20px' }}
        onClick={scrollToTop}
      >
        <NorthIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

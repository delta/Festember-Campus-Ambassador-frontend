import { useRef } from 'react';
import { IconButton } from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import styles from './styles.module.css';
import { landingPageData } from './homePageData';
import { StyledButton } from '../../theme';
import ScrollToTop from './ScrollToTop';

export default function Content() {
  const contentSection = useRef();
  const scrollDown = () => {
    window.scrollTo({
      top: contentSection.current.offsetTop,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div>
        <IconButton
          color="primary"
          style={{ position: 'absolute', right: '20px' }}
          onClick={scrollDown}
        >
          <SouthIcon sx={{ fontSize: 50 }}  />
        </IconButton>
      </div>
      <div className={styles.contentContainer} ref={contentSection}>
        {landingPageData.map(content => (
          <div className={styles.contentCard}>
            <div className={styles.contentCardHeader}>{content.header}</div>
            <div className={styles.contentCardDesc}>{content.content}</div>
          </div>
        ))}
        <StyledButton variant="contained">Register</StyledButton>
      </div>
      <ScrollToTop />
    </>
  );
}

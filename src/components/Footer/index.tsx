import React from 'react';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerBar}>
        <div className={styles.footerSocial}>
          <div className={styles.footerHead}>Our Socials</div>
          <div className={styles.footerList}>
            <a
              href="https://twitter.com/festember"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/festember/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/festember"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
        <div className={styles.footerDivider}></div>
        <div className={styles.footerContact}>
          <div className={styles.footerHead}>Contact</div>
          <div className={styles.footerList}>
            <div>Saisanika - 8870175774</div>
            <div>Bipin - 6380307533</div>
            <div>Jeevanand - 8139016201</div>
          </div>
        </div>
      </div>
      <div className={styles.madeWithLove}>
        Made with ❤️ by
        <a
          href="https://delta.nitt.edu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'green', textDecoration: 'none' }}
        >
          {' '}
          Delta Force
        </a>{' '}
        &
        <a
          href="https://graphique.club"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {' '}
          Graphique
        </a>
      </div>
    </div>
  );
}

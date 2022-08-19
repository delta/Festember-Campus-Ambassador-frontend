import React, { useEffect } from 'react';
import { useScrollToTop } from '../Home/ScrollToTop';
import styles from './styles.module.css';

export default function Header({ isRegistered }: { isRegistered: boolean }) {
  useEffect(() => {
    useScrollToTop();
  }, []);
  return (
    <div className={styles.headerContainer}>
      <div>
        <a href="https://www.festember.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="./festember-logo.png"
            alt="festember-logo"
            className={styles.headerlogo}
          />
        </a>
      </div>
      {!isRegistered ? (
        <>
          <div className={styles.headerContent}>
            <div className={styles.registerHeader}>Register Here</div>
            <div className={styles.registerContent}>
              Here is your chance to be part of the 47th edition of Festember,
              NIT Trichy. Become a Festember Crew member and unlock exciting
              opportunities!
            </div>
          </div>
          <div className={styles.registerDivider}></div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

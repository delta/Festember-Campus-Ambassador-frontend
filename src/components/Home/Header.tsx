import React from 'react';
import styles from './styles.module.css';
import { homePageHeaderData } from './homePageData';

export default function Header() {
  return (
    <>
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
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <img
              src="./landing-page-img.png"
              alt="landing-image"
              className={styles.landingImage}
            />
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerRightTop}>
              {homePageHeaderData.header}
            </div>
            <div className={styles.headerRightDesc}>
              {homePageHeaderData.content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

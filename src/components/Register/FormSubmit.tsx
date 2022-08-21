import React from 'react';
import styles from './styles.module.css';

export default function FormSubmit() {
  return (
    <div className={styles.formSubmitContainer}>
      <div className={styles.registerImage}>
        <img
          width={300}
          height={300}
          src="./landing-page-img.png"
          alt="festember-logo"
        />
      </div>
      <div>
        Thank you for applying to Festember Crew! Festember team will get back
        to you through email regarding further processes.
      </div>
    </div>
  );
}

import React from 'react';
import logo from './logo.svg';
import styles from './ReactWelcome.module.sass';

export default ({ onClick }) => (
  <div className={styles.app}>
    <header className={styles.appHeader}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <p>
        Edit files in <code>src/</code> and save to reload.
      </p>
      <a
        className={styles.appLink}
        href="/"
        onClick={onClick}
      >
        Or auth via Google account instead
      </a>
    </header>
  </div>
);
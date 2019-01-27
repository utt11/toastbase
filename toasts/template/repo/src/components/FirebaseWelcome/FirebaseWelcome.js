import React from 'react';
import logo from './logo-built_black.svg';
import styles from './FirebaseWelcome.module.sass';

export default ({ login: { result: { user: { email, photoURL, displayName }}} }) => (
  <div className={styles.app}>
    <header className={styles.appHeader}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <div className={styles.userBlock}>
        <img src={photoURL} className={styles.avatar} alt="avatar" />
        <div className={styles.info}>
            <div className={styles.text}>
              {email}
              <br/>
              {displayName}                
            </div>
        </div>
      </div>
    </header>
  </div>
);
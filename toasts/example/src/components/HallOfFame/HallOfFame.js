import React from 'react';
import styles from './HallOfFame.module.sass';
import UsersTable from './UsersTable/UsersTable';

class HallOfFame extends React.Component {
  return {
    (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={'/images/homescreen512.png'} className={styles.appLogo} alt="logo" />
          { result && <UsersTable user={result.user}/>
        </header>
      </div>
    )
  }
};

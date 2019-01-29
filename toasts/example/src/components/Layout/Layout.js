import React, { Component } from 'react';
import styles from './Layout.module.sass';

class Layout extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.display}>
          <div className={styles.paddingContainer} />
          { this.props.children }
        </div>
      </div>
    )
  }
};

export default Layout;

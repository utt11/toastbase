import React, { Component } from 'react';
import styles from './Intro.module.sass';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className={styles.wall}>        
        </div>
      </div>
    );
  }
}

export default Intro;

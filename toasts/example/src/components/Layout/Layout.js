import React, { Component } from 'react';
import styles from './Layout.module.sass';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: null
    };

    this.setTheme = this.setTheme.bind(this);
  }

  componentWillUnmount() {
    if (this.state.audio) {
      this.state.audio.stop();
    }
  }

  setTheme() {
    if (!this.state.audio) {
      this.setState({ audio: new Audio('/music/theme.mp3') }, () => {
        this.state.audio.play();
      });  
    }
  }

  render() {
    return (
      <div className={styles.wrapper} onClick={this.setTheme}>
        <div className={styles.display}>
          <div className={styles.paddingContainer} />
          { this.props.children }
        </div>
      </div>
    )
  }
};

export default Layout;

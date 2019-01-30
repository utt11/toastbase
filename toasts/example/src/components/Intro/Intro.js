import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './Intro.module.sass';
import AnimatedTitle from 'components/shared/AnimatedTitle/AnimatedTitle';
import config from 'config';
import punish from 'components/shared/images/punish.png';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      showAvatar: false,
      showWall: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ stage: 1}, () => {
        setTimeout(() => {
          this.setState({ stage: 2 }, () => {
            setTimeout(() => {
              this.setState({ showAvatar: true }, () => {
                setTimeout(() => {
                  this.setState({ stage: 3 }, () => {
                    setTimeout(() => {
                      this.setState({ stage: 4 }, () => {
                        setTimeout(() => {
                          this.setState({ showWall: true });
                        }, 1000);
                      })
                    }, 4000);
                  });
                }, 2000);
              });
            }, 1000);
          });
        }, 4000);
      });
    }, 5000);
  }

  render() {
    const { stage, showAvatar, showWall } = this.state;
    return (
      <div>
        { stage === 0 && <AnimatedTitle text={`Your school bully ${config.name}`} /> }
        { stage === 1 && <AnimatedTitle text={"And a really good whip"} animated={!showAvatar} /> }
        { stage === 2 && <div className={classnames(styles.avatar, { [styles.avatarShown]: showAvatar })} /> }
        { stage === 3 && <AnimatedTitle text={"In a game..."} animated={!showAvatar} /> }
        { stage === 4 && (
          <div className={classnames(styles.wall, { [styles.wallShown]: showWall })}>
            <img className={styles.punish} src={punish} />
            <div className={styles.name}>
              {config.name}
            </div>
            <img className={styles.bully} src={'/images/homescreen512.png'} />
          </div>
        )}
      </div>
    );
  }
}

export default Intro;

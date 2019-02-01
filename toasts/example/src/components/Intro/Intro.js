import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import gameActions from 'actions/game';
import { STATUSES } from 'constants/game';
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
      showWall: 0
    };

    this.startGame = this.startGame.bind(this);
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
                          this.setState({ showWall: 1 });
                        }, 3000);
                      })
                    }, 6000);
                  });
                }, 6000);
              });
            }, 1000);
          });
        }, 6000);
      });
    }, 6000);
  }

  startGame() {
    const { dispatch } = this.props;
    this.setState({ showWall: 2 }, () => {
      setTimeout(() => {
        dispatch(gameActions.setStatus(STATUSES.PLAYING));
      }, 3000);
    })
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
          <div className={classnames(styles.wall, { [styles.wallShown]: showWall === 1, [styles.wallHideAgain]: showWall === 2 })}>
            <img className={styles.punish} src={punish} />
            <div className={styles.name}>
              {config.name}
            </div>
            <img className={styles.bully} src={'/images/homescreen512.png'} onClick={this.startGame}/>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(Intro);

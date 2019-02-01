import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { sample, random, throttle } from 'lodash';
import gameActions from 'actions/game';
import { STATUSES } from 'constants/game';
import styles from './Level1.module.sass';
import AnimatedTitle from 'components/shared/AnimatedTitle/AnimatedTitle';
import config from 'config';
import punish from 'components/shared/images/punish.png';

const bullyPhrase = "Well, I know that I can't behave myself, but I think you are too unimportant to spend my time on teaching you, you know. So I won't take a fight.";
const tipPhrase = "DO NOT LET EM ESCAPE THE FIGHT!";

const bottomPercentages = [4, 24, 45, 66, 86];
const leftPercentages = [1, 16, 31, 46, 61, 76, 92];
const punishCount = 5;

class Level1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      showIntroWall: 0,
      showField: 0,
      left: punishCount,
      punishes: new Array(10),
      current: 0
    };

    this.punish = throttle(this.punish.bind(this), 1000);
  }

  componentDidMount() {
    this.stage0();
  }

  stage0() {
    setTimeout(() => {
      this.setState({ showIntroWall: 1 }, () => {
        setTimeout(() => {
          this.setState({ introBullySpeaking: 1 }, () => {
            setTimeout(() => {
              this.setState({ introBullySpeaking: 2 }, () => {
                setTimeout(() => {
                  this.setState({ showIntroWall: 2, introBullySpeaking: 0 }, () => {
                    setTimeout(() => {
                      this.setState({ stage: 1 }, () => {
                        this.stage1();
                      });
                    }, 2000);
                  });
                }, 5000);
              });
            }, 20000);
          });
        }, 9000);
      });
    }, 1000);
  }

  stage1() {
    setTimeout(() => {
      this.setCoord();
      this.setState({ showField: 1 }, () => {
        
      });
    }, 1000);
  }

  setCoord() {
    const thatStage = this.state.current;
    const toWait = random(500, 1000);
    this.setState({ xC: sample(leftPercentages), yC: sample(bottomPercentages)}, () => {
      setTimeout(() => {
        if (thatStage === this.state.current) {
          this.setCoord();
        }
      }, toWait);
    });
  }

  punish() {
    const { left, current, punishes } = this.state;
    if (left === 0 || punishes[left]) {
      return;
    }
    const newPunishes = [...punishes]
    newPunishes[left] = true
    this.setState({ left: left - 1, current: current + 1, punishes: newPunishes }, () => {
      if (this.state.left === 0) {
        this.setState({ xC: null, yC: null, showField: 2 }, () => {
          setTimeout(() => {
            this.props.dispatch(gameActions.setStatus(STATUSES.WON));
          }, 3000);
        })
      } else {
        this.setCoord();
      }
    });
  }

  render() {
    const { stage, showIntroWall, introBullySpeaking, showField, left, xC, yC } = this.state;
    const introWallClass = classnames(styles.introWall,
      {
        [styles.introWallShown]: showIntroWall === 1,
        [styles.introWallHideAgain]: showIntroWall === 2
      });
    const introBullyClass = classnames(styles.introBully,
      {
        [styles.speaking]: introBullySpeaking === 1
      });

    const fieldClass = classnames(styles.field,
      {
        [styles.fieldShown]: showField === 1,
        [styles.fieldHideAgain]: showField === 2
      });

    return (
      <div>
        { stage === 0 && (
            <div className={introWallClass}>
              <div className={styles.introBullyContainer}>
                <img className={introBullyClass} src={'/images/homescreen512.png'}/>
              </div>
              <div className={styles.introSpeak}>
                { introBullySpeaking === 1 && <AnimatedTitle text={bullyPhrase} type="bubble" /> }
                { introBullySpeaking === 2 && <AnimatedTitle text={tipPhrase} /> }
              </div>
            </div>
        )}
        { stage === 1 && (
            <div className={fieldClass}>
              <div className={styles.left}>
                {left}
              </div>
              { xC && yC && 
                <img onClick={this.punish} className={styles.fieldBully} style={{left: `${xC}%`, bottom: `${yC}%` }} src={'/images/homescreen64.png'}/> }
            </div>
        )}
      </div>
    );
  }
}

export default connect()(Level1);

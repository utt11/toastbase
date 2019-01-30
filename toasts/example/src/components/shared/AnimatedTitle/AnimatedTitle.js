import React from 'react';
import { Wave } from 'react-animated-text';
import styles from './AnimatedTitle.module.sass';

const AnimatedTitle = ({ text, animatedProps = {} }) => (
  <div className={styles.root}>
    <Wave text={text} effect={"verticalFadeIn"} iterations={1} {...animatedProps} />
  </div>
)

export default AnimatedTitle;

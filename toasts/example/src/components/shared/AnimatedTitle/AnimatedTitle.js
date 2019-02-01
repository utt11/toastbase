import React from 'react';
import { Wave } from 'react-animated-text';
import classnames from 'classnames';
import styles from './AnimatedTitle.module.sass';

const AnimatedTitle = ({ text, type, animatedProps = {} }) => (
  <div className={classnames(styles.root, { [styles.bubble]: type === "bubble" })}>
    <Wave text={text} effect={"verticalFadeIn"} iterations={1} {...animatedProps} />
  </div>
)

export default AnimatedTitle;

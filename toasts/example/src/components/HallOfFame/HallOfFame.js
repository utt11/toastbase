import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import styles from './HallOfFame.module.sass';
import UsersTable from './UsersTable/UsersTable';

import AnimatedTitle from '../shared/AnimatedTitle/AnimatedTitle';
import config from '../../config';
import { googleSignin, createOrUpdate, findById } from '../../firebase';

class HallOfFame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0
    };
    this.onClick = this.onClick.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      if (nextProps.login.result) {
        const { user } = nextProps.login.result;
        const { email, displayName } = user.email;
        let val = 0;
        const doc = await findById("users", email);
        if (doc.exists) {
            val = doc.data().visits;
        }
        createOrUpdate('users', email, { id: email, email, displayName, visits: val + 1 });
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ stage: 1 });
    }, 1000);
  }

  onClick(e) {
    e.preventDefault();
    googleSignin(this.props.dispatch);
  }

  render() {
    const { stage } = this.state;

    return (
      <div className={classnames(styles.hallOfFame, { [styles.move]: stage === 1 })}>
        <div className={styles.title}>
          <AnimatedTitle
            text={`WHO HAS PUNISHED ${config.name.toUpperCase()}`}
          />
        </div>
        <div className={styles.bully}>
          <img src={'/images/homescreen512.png'} className={styles.logo} alt="logo" onClick={this.onClick} />
        </div>
        <UsersTable />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(HallOfFame);

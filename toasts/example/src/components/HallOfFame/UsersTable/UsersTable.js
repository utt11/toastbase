import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findById, createOrUpdate, liveIndex } from '../../../firebase';
import styles from './UsersTable.module.sass';

class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveListener: null
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const liveListener = liveIndex(dispatch, "users");
    this.setState({ liveListener });
  }

  componentWillUnmount() {
      const { liveListener } = this.state;
      if (liveListener) {
          liveListener();
      }
  }

  render() {
    const { live } = this.props;
    const users = [];
    if (live.doc) {
        live.doc.forEach((user) => users.push(user.data()));
    }
    return (
      <div className={styles.root}>
        {
          users.map((user) => (
            <p key={user.email}>
              {user.email}
              {' '}
              {user.displayName}
              {' '}
              {user.visits}
            </p>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  live: state.live
});

export default connect(mapStateToProps)(UsersTable);

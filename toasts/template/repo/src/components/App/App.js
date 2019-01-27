import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import login from 'actions/login';
import ReactWelcome from 'components/ReactWelcome/ReactWelcome';
import FirebaseWelcome from 'components/FirebaseWelcome/FirebaseWelcome';

window.firebase = firebase;

const googleSignin = (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    dispatch(login.gSigninSuccess(result));
  }).catch((error) => {
    dispatch(login.gSigninFailure(error));
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    googleSignin(this.props.dispatch);
  }

  render() {
    const { login } = this.props;
    window.login = login;

    return (
      <div>
        {
          !login.result && <ReactWelcome onClick={this.onClick} />
        }
        {
          login.result && <FirebaseWelcome login={login} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(App);

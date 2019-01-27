import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import firebase from '../firebase';
import login from 'actions/login';

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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="/"
            onClick={this.onClick}
          >
            Or auth via Google account instead
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(App);

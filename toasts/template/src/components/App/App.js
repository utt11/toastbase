import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleSignin } from '../../firebase';
import ReactWelcome from 'components/ReactWelcome/ReactWelcome';
import FirebaseWelcome from 'components/FirebaseWelcome/FirebaseWelcome';

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

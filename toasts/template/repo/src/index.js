import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import logo from 'components/FirebaseWelcome/logo-built_black.svg';

ReactDOM.render(
  <Provider store={store}>
    <img rel="preload" src={logo} as="image" style={{display: "none"}} />
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

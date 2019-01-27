import { combineReducers } from 'redux';
import live from './live';
import login from './login';

export default () => combineReducers({
  live,
  login
});

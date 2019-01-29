import { combineReducers } from 'redux';
import game from './game';
import live from './live';
import login from './login';

export default () => combineReducers({
  game,
  live,
  login
});

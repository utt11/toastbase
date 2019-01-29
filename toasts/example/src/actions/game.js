import { GAME_ACTIONS } from 'constants/actions';

function action(type, payload = {}) {
  return { type, payload };
};

export default {
  setLevel: level => action(GAME_ACTIONS.SET_LEVEL, { level }),
  setStatus: status => action(GAME_ACTIONS.SET_STATUS, { status })
};

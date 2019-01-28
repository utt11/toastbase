import { LIVE_ACTIONS } from 'constants/actions';

function action(type, payload = {}) {
  return { type, payload };
};

export default {
  snapshot: doc => action(LIVE_ACTIONS.SNAPSHOT, { doc })
};

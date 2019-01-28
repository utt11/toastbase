import { LIVE_ACTIONS } from 'constants/actions';

export default function live(state = {}, action) {
  switch (action.type) {
    case LIVE_ACTIONS.SNAPSHOT:
      return {
        doc: action.payload.doc
      };
    default:
  }
  return state;
};

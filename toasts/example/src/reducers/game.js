import { GAME_ACTIONS } from 'constants/actions';
import { STATUSES } from 'constants/game';

export default function game(state = { status: STATUSES.INTRO, level: 1 }, action) {
  switch (action.type) {
    case GAME_ACTIONS.SET_LEVEL:
      return {
        ...state,
        level: action.payload.level
      };
    case GAME_ACTIONS.SET_STATUS:
      return {
          ...state,
          status: action.payload.status,
          level: action.payload.status === STATUSES.PLAYING ? 1 : state.level
      }
    default:
  }
  return state;
};

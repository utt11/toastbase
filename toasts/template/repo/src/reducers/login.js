import { LOGIN_ACTIONS } from 'constants/actions'

export default function login(state = {}, action) {
  switch (action.type) {
    case LOGIN_ACTIONS.G_SIGNIN_SUCCESS:
      return {
        ...state,
        result: action.payload.result
      }
    case LOGIN_ACTIONS.G_SIGNIN_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }
      default:
  }
  return state
}

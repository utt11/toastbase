import { LOGIN_ACTIONS } from 'constants/actions'

export default function login(state = {}, action) {
  switch (action.type) {
    case LOGIN_ACTIONS.G_SIGNIN_SUCCESS:
      return {
        result: action.payload.result,
        error: null
      }
    case LOGIN_ACTIONS.G_SIGNIN_FAILURE:
      return {
        result: null,
        error: action.payload.error
      }
      default:
  }
  return state
}

import { LOGIN_ACTIONS } from 'constants/actions';

function action(type, payload = {}) {
  return { type, payload };
};

export default {
  gSigninSuccess: result => action(LOGIN_ACTIONS.G_SIGNIN_SUCCESS, { result }),
  gSigninFailure: error => action(LOGIN_ACTIONS.G_SIGNIN_FAILURE, { error }),
};

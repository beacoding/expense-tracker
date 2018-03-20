import { emailConstants } from '../constants';

const initialState = {
  isFetching: false,
  error: undefined,
};

const email = (state = initialState, action) => {

  switch (action.type) {
    // REQUEST EMAIL
    case emailConstants.SEND_EMAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case emailConstants.SEND_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: undefined
      });
    case emailConstants.SEND_EMAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default email;
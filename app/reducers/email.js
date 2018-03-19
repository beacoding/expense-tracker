import { emailConstants } from '../constants';

const initialState = {
  isFetching: false,
  error: undefined,
  claimee_email: null,
  approver_email: null

};

const email = (state = initialState, action) => {

  switch (action.type) {
    // REQUEST EMAIL
    case emailConstants.REQUEST_EMAIL:
      return Object.assign({}, state, {
        isFetching: true
      });
    case emailConstants.RECEIVE_EMAIL:
      return Object.assign({}, state, {
        isFetching: false,
        claimee_email: action.claimee_email,
        approver_email: action.approver_email,
        error: undefined
      });
    case emailConstants.FAILURE_EMAIL:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });


    default:
      return state;
  }
}

export default email;
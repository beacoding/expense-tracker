import { claimsConstants } from '../constants';
import { claimsAPI } from '../api'

export const claimsActions = {
    addClaim,
    removeClaim,
    requestAll,
};

function addClaim() {
  //TODO add claim
  dispatch({type: claimsConstants.ADD_CLAIM});
}

function removeClaim() {
  //TODO remove claim
  dispatch({type: claimsConstants.REMOVE_CLAIM});
}

function requestAll() {
  return dispatch => {
    dispatch(request());
    claimsAPI.requestAll()
      .then(
          res => dispatch(success(res.claims)),
          error => dispatch(failure(error))
      );
  };

  function request() { return { type: claimsConstants.REQUEST_CLAIMS } }
  function success(claims) { return { type: claimsConstants.RECEIVE_CLAIMS, claims }}
  function failure(error) { return { type: claimsConstants.FAILURE_CLAIMS, error }}
}
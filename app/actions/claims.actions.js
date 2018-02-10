import { claimsConstants } from '../constants';
import { claimsAPI } from '../api'

export const claimsActions = {
    addClaim,
    removeClaim,
    requestAll,
    requestPendingApprovals
};

function addClaim(claim) {
  //TODO add claim
  //expects an obj like
  // {
  //   claimee_id,
  //   approver_id,
  //   company_id,
  //   cost_centre_id,
  //   description,
  //   account_number,
  //   notes
  // }
  return dispatch => {
    dispatch(request());
    claimsAPI.addClaim(claim)
    .then(
      res => dispatch(success()),
      err => dispatch(failure(error))
      )
  };
  function request() { return { type: claimsConstants.ADD_CLAIM_REQUEST } }
  function success(claims) { return { type: claimsConstants.ADD_CLAIM_SUCCESS }}
  function failure(error) { return { type: claimsConstants.FAILURE_CLAIM, error }}
}

function removeClaim() {
  //TODO remove claim
  //expects 
  // {
  //  id
  // }
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

function requestPendingApprovals() {
  return dispatch => {
    dispatch(request());
    claimsAPI.requestPendingApprovals()
      .then(
          res => dispatch(success(res.claims)),
          error => dispatch(failure(error))
      );
  };

  function request() { return { type: claimsConstants.REQUEST_PENDING_APPROVALS } }
  function success(claims) { return { type: claimsConstants.RECEIVE_PENDING_APPROVALS, claims }}
  function failure(error) { return { type: claimsConstants.FAILURE_PENDING_APPROVALS, error }}
}
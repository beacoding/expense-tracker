import { claimsConstants } from '../constants';
import { claimsAPI } from '../api'

export const claimsActions = {
  addClaim,
  deleteClaim,
  updateStatus,
  requestAll,
  requestOne,
  requestWith,
  requestPendingApprovals,
  requestProcessedApprovals,
  clearAll
};

function paginate(endpoint) {
    dispatch({
      type: claimsConstants.PAGINATE,
      endpoint
    });
}

function addClaim(claim) {
  return dispatch => {
    dispatch(request(claim));
    return claimsAPI.addClaim(claim).then(
      res => {
        return dispatch(success(res.claim.insertId, claim))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  };
  function request(claim) { return { type: claimsConstants.ADD_CLAIM_REQUEST, claim }}
  function success(claimId, claim) { return { type: claimsConstants.ADD_CLAIM_SUCCESS, claimId, claim }}
  function failure(error) { return { type: claimsConstants.ADD_CLAIM_FAILURE, error }}
}

function deleteClaim(claim_id) {
  return dispatch => {
    dispatch(request(claim_id));
    return claimsAPI.deleteClaim(claim_id).then(
      res => {
        return dispatch(success(res.claim.insertId))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  };
  function request(claim_id) { return { type: claimsConstants.DELETE_CLAIM_REQUEST, claim_id }}
  function success(claim_id) { return { type: claimsConstants.DELETE_CLAIM_SUCCESS, claim_id }}
  function failure(error) { return { type: claimsConstants.DELETE_CLAIM_FAILURE, error }}
}

function updateStatus(claim_id, approver_id, status, notes) {
  return dispatch => {
    dispatch(request(claim_id, approver_id, status, notes));
    return claimsAPI.updateStatus(claim_id, approver_id, status, notes).then(
      res => {
        return dispatch(success(res.claim))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  function request(claim_id, approver_id, status, notes) { return { type: claimsConstants.UPDATE_CLAIM_STATUS_REQUEST, claim_id, approver_id, status, notes }}
  function success(claim) { return { type: claimsConstants.UPDATE_CLAIM_STATUS_SUCCESS, claim }}
  function failure(error) { return { type: claimsConstants.UPDATE_CLAIM_STATUS_FAILURE, error }}
}

function requestAll() {
  return dispatch => {
    dispatch(request());
    return claimsAPI.requestAll().then(
      res => {
        return dispatch(success(res.claims))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: claimsConstants.REQUEST_CLAIMS }}
  function success(claims) { return { type: claimsConstants.RECEIVE_CLAIMS, claims }}
  function failure(error) { return { type: claimsConstants.FAILURE_CLAIMS, error }}
}

function requestWith(params) {
  return dispatch => {
    dispatch(request());
    claimsAPI.requestWith(params)
    .then(
      res => {
        return dispatch(success(res.claims))
      },
      error => {
        return dispatch(failure(error))
      }
    );

    function request() { return { type: claimsConstants.REQUEST_CLAIMS }}
    function success(claims) { return { type: claimsConstants.RECEIVE_CLAIMS, claims }}
    function failure(error) { return { type: claimsConstants.FAILURE_CLAIMS, error }}
  }
}

function requestOne(claim_id) {
  return dispatch => {
    dispatch(request(claim_id));
    return claimsAPI.requestOne(claim_id).then(
      res => { 
        return dispatch(success(res.claim))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request(claim_id) { return { type: claimsConstants.REQUEST_CLAIM, claim_id }}
  function success(claim) { return { type: claimsConstants.RECEIVE_CLAIM, claim }}
  function failure(error) { return { type: claimsConstants.FAILURE_CLAIM, error }} 
}

function requestPendingApprovals() {
  return dispatch => {
    dispatch(request());
    return claimsAPI.requestPendingApprovals().then(
      res => {
        return dispatch(success(res.claims))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: claimsConstants.REQUEST_PENDING_APPROVALS }}
  function success(claims) { return { type: claimsConstants.RECEIVE_PENDING_APPROVALS, claims }}
  function failure(error) { return { type: claimsConstants.FAILURE_PENDING_APPROVALS, error }}
}

function requestProcessedApprovals() {
  return dispatch => {
    dispatch(request());
    return claimsAPI.requestProcessedApprovals().then(
      res => {
        return dispatch(success(res.claims))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: claimsConstants.REQUEST_APPROVED_APPROVALS }}
  function success(claims) { return { type: claimsConstants.RECEIVE_APPROVED_APPROVALS, claims }}
  function failure(error) { return { type: claimsConstants.FAILURE_APPROVED_APPROVALS, error }}
}

function clearAll() {
  return dispatch => {
    dispatch({ type: claimsConstants.CLEAR_CLAIMS });
  }
}
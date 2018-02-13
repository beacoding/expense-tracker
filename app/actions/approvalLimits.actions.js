import { approvalLimitsConstants } from '../constants';
import { approvalLimitsAPI } from '../api'

export const approvalLimitsActions = {
    addApprovalLimit,
    updateApprovalLimit,
    requestAll,
    requestByEmployee,
    requestHasAuthority
};

function addApprovalLimit() {
}

function updateApprovalLimit() {
}

function requestAll() {
  return dispatch => {
    dispatch(request());
    approvalLimitsAPI.requestAll()
      .then(
          res => {
            dispatch(success(res.limits)) 
          },
          error => {
            dispatch(failure(error))
          }
      );
  };

  function request() { return { type: approvalLimitsConstants.REQUEST_ALL_LIMITS }}
  function success(limits) { return { type: approvalLimitsConstants.RECEIVE_ALL_LIMITS, limits }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_ALL_LIMITS, error }}
}

function requestByEmployee() {
  return dispatch => {
    dispatch(request());
    approvalLimitsAPI.requestAllByEmployee()
      .then(
          res => {
            dispatch(success(res.limits)) 
          },
          error => {
            dispatch(failure(error))
          }
      );
  };

  function request() { return { type: approvalLimitsConstants.REQUEST_USER_LIMITS }}
  function success(limits) { return { type: approvalLimitsConstants.RECEIVE_USER_LIMITS, limits }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_USER_LIMITS, error }}
}

function requestHasAuthority(cost_centre_id) {
  return dispatch => {
    dispatch(request());
    approvalLimitsAPI.requestHasAuthority(cost_centre_id)
      .then(
          res => {
            dispatch(success(res.limits)) 
          },
          error => {
            dispatch(failure(error))
          }
      );
  };

  function request() { return { type: approvalLimitsConstants.REQUEST_FORWARD_MANAGERS }}
  function success(managers) { return { type: approvalLimitsConstants.RECEIVE_FORWARD_MANAGERS, managers }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_FORWARD_MANAGERS, error }}
}
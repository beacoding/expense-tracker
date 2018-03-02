import { approvalLimitsConstants } from '../constants';
import { approvalLimitsAPI } from '../api'

export const approvalLimitsActions = {
  addApprovalLimit,
  updateApprovalLimit,
  requestAll,
  requestByEmployee,
  requestHasAuthority,
  modifyParams,
  requestWith
};

function addApprovalLimit() {
}

function updateApprovalLimit(employee_id, cost_centre_id, new_limit) {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.updateApprovalLimit(employee_id, cost_centre_id, new_limit).then(
      res => dispatch(success(employee_id, cost_centre_id, new_limit)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_UPDATE_APPROVAL_LIMIT }}
  function success(employee_id, cost_centre_id, new_limit) { return { type: approvalLimitsConstants.SUCCESS_UPDATE_APPROVAL_LIMIT, new_limit }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_UPDATE_APPROVAL_LIMIT, error }}
}

function requestWith(params) {
  return dispatch => {
    dispatch(request());
    approvalLimitsAPI.requestWith(params)
    .then(
      res => {
        dispatch(success(res.claims))
      },
      error => dispatch(failure(error))
    );

    function request() { return { type: approvalLimitsConstants.REQUEST_ALL_LIMITS }}
    function success(limits) { return { type: approvalLimitsConstants.RECEIVE_ALL_LIMITS, limits }}
    function failure(error) { return { type: approvalLimitsConstants.FAILURE_ALL_LIMITS, error }}
  }
}

function requestAll() {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.requestAll().then(
      res => dispatch(success(res.limits)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_ALL_LIMITS }}
  function success(limits) { return { type: approvalLimitsConstants.RECEIVE_ALL_LIMITS, limits }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_ALL_LIMITS, error }}
}

function requestByEmployee() {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.requestAllByEmployee().then(
      res => dispatch(success(res.limits)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_USER_LIMITS }}
  function success(limits) { return { type: approvalLimitsConstants.RECEIVE_USER_LIMITS, limits }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_USER_LIMITS, error }}
}

function requestHasAuthority(cost_centre_id) {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.requestHasAuthority(cost_centre_id).then(
      res => dispatch(success(res.limits)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_FORWARD_MANAGERS }}
  function success(managers) { return { type: approvalLimitsConstants.RECEIVE_FORWARD_MANAGERS, managers }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_FORWARD_MANAGERS, error }}
}

function modifyParams(param_to_change, value) {
  return { type: approvalLimitsConstants.MODIFY_PARAMS, param_to_change, value };
}

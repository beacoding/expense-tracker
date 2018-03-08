import { approvalLimitsConstants } from '../constants';
import { approvalLimitsAPI } from '../api'

export const approvalLimitsActions = {
  addApprovalLimit,
  updateApprovalLimit,
  revokeApprovalLimit,
  requestAll,
  requestByEmployee,
  requestHasAuthority,
  modifyParams,
  findAllCostCentres,
  requestWith
};

function findAllCostCentres() {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.findAllCostCentres().then(
      res => dispatch(success(res.cost_centres)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_COST_CENTRES }}
  function success(cost_centres) { return { type: approvalLimitsConstants.RECEIVE_COST_CENTRES, cost_centres }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_COST_CENTRES, error }}
}

function addApprovalLimit(params) {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.addApprovalLimit(params).then(
      res => dispatch(success(params)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_ADD_APPROVAL_LIMIT }}
  function success(new_limit) { return { type: approvalLimitsConstants.SUCCESS_ADD_APPROVAL_LIMIT, new_limit }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_ADD_APPROVAL_LIMIT, error }}
}

function updateApprovalLimit(employee_id, cost_centre_id, limit) {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.updateApprovalLimit(employee_id, cost_centre_id, limit).then(
      res => {
        let new_limit = {
          employee_id: employee_id,
          cost_centre_id: cost_centre_id,
          approval_limit: limit
        }
        if (new_limit.approval_limit === '') {
          new_limit.approval_limit = null;
        }
        dispatch(success(new_limit))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_UPDATE_APPROVAL_LIMIT }}
  function success(new_limit) { return { type: approvalLimitsConstants.SUCCESS_UPDATE_APPROVAL_LIMIT, new_limit }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_UPDATE_APPROVAL_LIMIT, error }}
}

function revokeApprovalLimit(employee_id, cost_centre_id) {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.revokeApprovalLimit(employee_id, cost_centre_id).then(
      res => {
        let revoked_limit = {
          employee_id: employee_id,
          cost_centre_id: cost_centre_id
        }
        dispatch(success(revoked_limit))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: approvalLimitsConstants.REQUEST_REVOKE_APPROVAL_LIMIT }}
  function success(revoked_limit) { return { type: approvalLimitsConstants.SUCCESS_REVOKE_APPROVAL_LIMIT, revoked_limit }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_REVOKE_APPROVAL_LIMIT, error }}
}

function requestWith(params) {
  return dispatch => {
    dispatch(request());
    approvalLimitsAPI.requestWith(params)
    .then(
      res => {
        dispatch(success(res.limits))
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

function requestHasAuthority(cost_centre_id, claim_amount) {
  return dispatch => {
    dispatch(request());
    return approvalLimitsAPI.requestHasAuthority(cost_centre_id, claim_amount).then(
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

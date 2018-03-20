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
      res => {
        return dispatch(success(res.cost_centres))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };

  function request() { return { type: approvalLimitsConstants.REQUEST_COST_CENTRES }}
  function success(cost_centres) { return { type: approvalLimitsConstants.RECEIVE_COST_CENTRES, cost_centres }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_COST_CENTRES, error }}
}

function addApprovalLimit(params) {
  return dispatch => {
    dispatch(request(params));
    return approvalLimitsAPI.addApprovalLimit(params).then(
      res => {
        return dispatch(success(params))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };

  function request(params) { return { type: approvalLimitsConstants.ADD_APPROVAL_LIMIT_REQUEST, params }}
  function success(new_limit) { return { type: approvalLimitsConstants.ADD_APPROVAL_LIMIT_SUCCESS, new_limit }}
  function failure(error) { return { type: approvalLimitsConstants.ADD_APPROVAL_LIMIT_FAILURE, error }}
}

function updateApprovalLimit(employee_id, cost_centre_id, limit) {
  return dispatch => {
    dispatch(request(employee_id, cost_centre_id, limit));
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
        return dispatch(success(new_limit))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };

  function request(employee_id, cost_centre_id, limit) { return { type: approvalLimitsConstants.UPDATE_APPROVAL_LIMIT_REQUEST, employee_id, cost_centre_id, limit }}
  function success(new_limit) { return { type: approvalLimitsConstants.UPDATE_APPROVAL_LIMIT_SUCCESS, new_limit }}
  function failure(error) { return { type: approvalLimitsConstants.UPDATE_APPROVAL_LIMIT_FAILURE, error }}
}

function revokeApprovalLimit(employee_id, cost_centre_id) {
  return dispatch => {
    dispatch(request(employee_id, cost_centre_id));
    return approvalLimitsAPI.revokeApprovalLimit(employee_id, cost_centre_id).then(
      res => {
        let revoked_limit = {
          employee_id: employee_id,
          cost_centre_id: cost_centre_id
        }
        return dispatch(success(revoked_limit))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };

  function request(employee_id, cost_centre_id) { return { type: approvalLimitsConstants.REQUEST_REVOKE_APPROVAL_LIMIT, employee_id, cost_centre_id }}
  function success(revoked_limit) { return { type: approvalLimitsConstants.SUCCESS_REVOKE_APPROVAL_LIMIT, revoked_limit }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_REVOKE_APPROVAL_LIMIT, error }}
}

function requestWith(params) {
  return dispatch => {
    dispatch(request());
    approvalLimitsAPI.requestWith(params)
      .then(
        res => {
          return dispatch(success(res.limits))
        },
        error => {
          return dispatch(failure(error))
        }
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
      res => {
        return dispatch(success(res.limits))
      },
      error => {
        return dispatch(failure(error))
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
    return approvalLimitsAPI.requestAllByEmployee().then(
      res => {
        return dispatch(success(res.limits))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };

  function request() { return { type: approvalLimitsConstants.REQUEST_USER_LIMITS }}
  function success(limits) { return { type: approvalLimitsConstants.RECEIVE_USER_LIMITS, limits }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_USER_LIMITS, error }}
}

function requestHasAuthority(cost_centre_id, claim_amount) {
  return dispatch => {
    dispatch(request(cost_centre_id, claim_amount));
    return approvalLimitsAPI.requestHasAuthority(cost_centre_id, claim_amount).then(
      res => {
        return dispatch(success(res.limits))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };

  function request(cost_centre_id, claim_amount) { return { type: approvalLimitsConstants.REQUEST_FORWARD_MANAGERS, cost_centre_id, claim_amount }}
  function success(managers) { return { type: approvalLimitsConstants.RECEIVE_FORWARD_MANAGERS, managers }}
  function failure(error) { return { type: approvalLimitsConstants.FAILURE_FORWARD_MANAGERS, error }}
}

function modifyParams(param_to_change, value) {
  return { type: approvalLimitsConstants.MODIFY_PARAMS, param_to_change, value };
}

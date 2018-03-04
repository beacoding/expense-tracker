import { apiHelpers } from '../helpers'
export const approvalLimitsAPI = {
  addApprovalLimit,
  removeApprovalLimit,
  updateApprovalLimit,
  requestAll,
  requestAllByEmployee,
  requestHasAuthority,
  requestWith
};

function addApprovalLimit(newApprovalLimit) {
  //TODO: send a claim over to the server and dispatch
  return fetch('/approval_limits/add', apiHelpers.postOptions(newApprovalLimit))
  .then(res => apiHelpers.handleResponse(res));
}

function removeApprovalLimit() {
  //TODO: remove a claim over to the server and dispatch
}

function updateApprovalLimit(employee_id, cost_centre_id, new_limit) {
  return fetch('/approval_limits/update', apiHelpers.postOptions({
    employee_id: employee_id,
    cost_centre_id: cost_centre_id,
    approval_limit: new_limit
  }))
  .then(res => apiHelpers.handleResponse(res));
}

function requestAll() {
  return fetch('/approval_limits/all', apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestAllByEmployee() {
  return fetch('/approval_limits/current_user', apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestHasAuthority(cost_centre_id, claim_amount) {
  return fetch('/approval_limits/has_authority', apiHelpers.postOptions({
    cost_centre_id: cost_centre_id,
    claim_amount: claim_amount
  }))
  .then(res => apiHelpers.handleResponse(res));
}

function requestWith(params) {
  var queryParams = jQuery.param(params);
 return fetch(`/approval_limits/with?` + queryParams, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

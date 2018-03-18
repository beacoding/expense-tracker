import { apiHelpers } from '../helpers'
export const approvalLimitsAPI = {
  addApprovalLimit,
  revokeApprovalLimit,
  updateApprovalLimit,
  requestAll,
  requestAllByEmployee,
  requestHasAuthority,
  findAllCostCentres,
  requestWith
};

function addApprovalLimit(params) {
  return fetch('/approval_limits/add', apiHelpers.postOptions(params))
  .then( apiHelpers.handleResponse);
}

function findAllCostCentres() { 
  return fetch('/approval_limits/find_all_cost_centres', apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function revokeApprovalLimit(employee_id, cost_centre_id) {
  return fetch('/approval_limits/revoke', apiHelpers.postOptions({employee_id: employee_id, cost_centre_id: cost_centre_id}))
  .then(apiHelpers.handleResponse);
}

function updateApprovalLimit(employee_id, cost_centre_id, new_limit) {
  return fetch('/approval_limits/update', apiHelpers.postOptions({employee_id: employee_id, cost_centre_id: cost_centre_id, approval_limit: new_limit}))
  .then(apiHelpers.handleResponse);
}

function requestAll() {
  return fetch('/approval_limits/all', apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestAllByEmployee() {
  return fetch('/approval_limits/current_user', apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestHasAuthority(cost_centre_id, claim_amount) {
  return fetch('/approval_limits/has_authority', apiHelpers.postOptions({
    cost_centre_id: cost_centre_id,
    claim_amount: claim_amount
  }))
  .then(apiHelpers.handleResponse);
}

function requestWith(params) {
  var queryParams = jQuery.param(params);
 return fetch(`/approval_limits/with?` + queryParams, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

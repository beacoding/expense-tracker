import { apiHelpers } from '../helpers'
export const claimsAPI = {
  addClaim,
  deleteClaim,
  updateStatus,
  requestAll,
  requestOne,
  requestPendingApprovals,
  requestProcessedApprovals,
  requestWith,
  requestMileageSoFarPerMonth
};

function addClaim(claim) {
  return fetch('/claims/add_claim', apiHelpers.postOptions(claim))
   .then(apiHelpers.handleResponse);
}

function deleteClaim(claim_id) {
  return fetch('/claims/delete_claim', apiHelpers.postOptions({claim_id: claim_id}))
   .then(apiHelpers.handleResponse);
}

function updateStatus(claim_id, approver_id, status, notes) {
  return fetch('/claims/update_status', apiHelpers.postOptions({
    claim_id: claim_id,
    approver_id: approver_id,
    status: status,
    notes: notes
  }))
   .then(apiHelpers.handleResponse);
}

function requestAll() {
 return fetch('/claims/all', apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestWith(params) {
  var queryParams = jQuery.param(params);
 return fetch(`/claims/with?` + queryParams, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestOne(claim_id) {
  return fetch(`/claims/one?claim_id=${claim_id}`, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestPendingApprovals() {
  return fetch('/claims/pending_approvals', apiHelpers.getOptions())
   .then(apiHelpers.handleResponse);
 }

 function requestProcessedApprovals() {
   return fetch('/claims/processed_approvals', apiHelpers.getOptions())
    .then(apiHelpers.handleResponse);
  }

  function requestMileageSoFarPerMonth() {
    return fetch('/claims/mileage_so_far_per_month', apiHelpers.getOptions())
    .then(apiHelpers.handleResponse)
  }
  

import { apiHelpers } from '../helpers'
export const claimsAPI = {
  addClaim,
  deleteClaim,
  updateStatus,
  requestAll,
  requestOne,
  requestPendingApprovals,
  requestProcessedApprovals,
  requestWith
};

function addClaim(claim) {
  //TODO: send a claim over to the server and dispatch
  return fetch('/claims/add_claim', apiHelpers.postOptions(claim))
   .then(res => apiHelpers.handleResponse(res));
}

function deleteClaim(claim_id) {
    return fetch('/claims/delete_claim', apiHelpers.postOptions({claim_id: claim_id}))
     .then(res => apiHelpers.handleResponse(res));
}

function updateStatus(claim_id, approver_id, status, notes) {
  return fetch('/claims/update_status', apiHelpers.postOptions({
    claim_id: claim_id,
    approver_id: approver_id,
    status: status,
    notes: notes
  }))
   .then(res => apiHelpers.handleResponse(res));
}

function requestAll() {
 return fetch('/claims/all', apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestWith(params) {
  var queryParams = jQuery.param(params);
 return fetch(`/claims/with?` + queryParams, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestOne(claim_id) {
  return fetch(`/claims/one?claim_id=${claim_id}`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestPendingApprovals() {
  return fetch('/claims/pending_approvals', apiHelpers.getOptions())
   .then(res => apiHelpers.handleResponse(res));
 }

 function requestProcessedApprovals() {
   return fetch('/claims/processed_approvals', apiHelpers.getOptions())
    .then(res => apiHelpers.handleResponse(res));
  }

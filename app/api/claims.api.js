import { apiHelpers } from '../helpers'
export const claimsAPI = {
  addClaim,
  removeClaim,
  updateStatus,
  requestAll,
  requestPendingApprovals,
};

function addClaim(claim) {
  //TODO: send a claim over to the server and dispatch
  return fetch('/claims/add_claim', apiHelpers.postOptions(claim))
   .then(res => apiHelpers.handleResponse(res));
}

function removeClaim() {
  //TODO: remove a claim over to the server and dispatch
}

function updateStatus(claim_id, approver_id, status) {
  return fetch('/claims/update_status', apiHelpers.postOptions({
    claim_id: claim_id,
    approver_id: approver_id,
    status: status
  }))
   .then(res => apiHelpers.handleResponse(res));
}

function requestAll() {
 return fetch('/claims/all', apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestPendingApprovals() {
  return fetch('/claims/pending_approvals', apiHelpers.getOptions())
   .then(res => apiHelpers.handleResponse(res));
 }

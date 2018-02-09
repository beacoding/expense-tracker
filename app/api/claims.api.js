import { apiHelpers } from '../helpers'
export const claimsAPI = {
    addClaim,
    removeClaim,
    requestAll,
    requestPendingApprovals,
};

function addClaim(claim) {
  //TODO: send a claim over to the server and dispatch
  return fetch('/add_claim', apiHelpers.postOptions(claim))
   .then(res => apiHelpers.handleResponse(res));
}

function removeClaim() {
  //TODO: remove a claim over to the server and dispatch
}

function requestAll() {
 return fetch('/claims', apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestPendingApprovals() {
  return fetch('/claims/pending_approvals', apiHelpers.getOptions())
   .then(res => apiHelpers.handleResponse(res));
 }

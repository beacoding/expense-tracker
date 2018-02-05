import { apiHelpers } from '../helpers'

export const claimItemsAPI = {
    addClaimItem,
    removeClaimItem,
    requestAll
};

function addClaimItem() {
  //TODO: send a claim item over to the server and dispatch
}

function removeClaimItem() {
  //TODO: remove a claim item over to the server and dispatch
}

function requestAll(claimID) {
 return fetch(`/claim_items?claim_id=${claimID}`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}
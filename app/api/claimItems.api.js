import { apiHelpers } from '../helpers'

export const claimItemsAPI = {
    addClaimItem,
    removeClaimItem,
    requestAll
};

function addClaimItem(item) {
  //TODO: send a claim item over to the server and dispatch
  return fetch(`/claim_items/add_item`, apiHelpers.postOptions(item))
    .then(res => apiHelpers.handleResponse(res));
}

function removeClaimItem() {
  //TODO: remove a claim item over to the server and dispatch
}

function requestAll(claimID) {
 return fetch(`/claim_items?claim_id=${claimID}`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}
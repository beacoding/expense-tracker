import { apiHelpers } from '../helpers'

export const claimItemsAPI = {
  addClaimItem,
  removeClaimItem,
  requestAll
};

function addClaimItem(item) {
  return fetch(`/claim_items/add_item`, apiHelpers.postOptions(item))
  .then(res => apiHelpers.handleResponse(res));
}


function removeClaimItem() {
  //TODO: remove a claim item over to the server and dispatch
}

function requestAll(claim_id) {
  return fetch(`/claim_items?claim_id=${claim_id}`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}
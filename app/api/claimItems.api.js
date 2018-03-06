import { apiHelpers } from '../helpers'

export const claimItemsAPI = {
  addClaimItem,
  deleteClaimItem,
  requestAll
};

function addClaimItem(item) {
  return fetch(`/claim_items/add_item`, apiHelpers.postFormOptions(item))
  .then(res => apiHelpers.handleResponse(res));
}


function deleteClaimItem(claim_item_id) {
  return fetch('/claim_items/delete_item', apiHelpers.postOptions({claim_item_id: claim_item_id}))
   .then(res => {
    console.log(res);
    apiHelpers.handleResponse(res)
  });
}

function requestAll(claim_id) {
  return fetch(`/claim_items?claim_id=${claim_id}`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}
import { claimItemsConstants } from '../constants';
import { claimItemsAPI } from '../api'

export const claimItemsActions = {
  addClaimItem,
  removeClaimItem,
  requestAll,
  clearAll
};

function addClaimItem(item) {
  return dispatch => {
    dispatch(request());
    claimItemsAPI.addClaimItem(item)
    .then(
      res => {
        dispatch(success(res.claimItem, item.claim_id))
      },
      error => dispatch(failure(error))
    )
  };
  function request() { return { type: claimItemsConstants.ADD_CLAIM_ITEM }}
  function success(new_claim_item, claim_id) { return { type: claimItemsConstants.ADD_CLAIM_ITEM_SUCCESS, new_claim_item, claim_id }}
  function failure(error) { return { type: claimItemsConstants.ADD_CLAIM_ITEM_FAILURE, error }}
}


function removeClaimItem() {
  //TODO remove claimItem
  //expects object like
  // {
  //   id
  // }
}

function requestAll(claim_id) {
  //TODO fetch all with claim id
  return dispatch => {
    dispatch(request());
    claimItemsAPI.requestAll(claim_id)
    .then(
      res => dispatch(success(res.claimItems, claim_id)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: claimItemsConstants.REQUEST_CLAIM_ITEMS }}
  function success(claimItems, claimId) { return { type: claimItemsConstants.RECEIVE_CLAIM_ITEMS, claimId, claimItems }}
  function failure(error) { return { type: claimItemsConstants.FAILURE_CLAIM_ITEMS, error }}
}

function clearAll() {
  return dispatch => {
    dispatch({ type: claimItemsConstants.CLEAR_CLAIM_ITEMS });
  }
}
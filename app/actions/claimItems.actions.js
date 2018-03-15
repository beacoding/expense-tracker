import { claimItemsConstants } from '../constants';
import { claimItemsAPI } from '../api'

export const claimItemsActions = {
  addClaimItem,
  deleteClaimItem,
  requestAll,
  editClaimItem,
  clearAll
};

function addClaimItem(item) {
  return dispatch => {
    dispatch(request());
    return claimItemsAPI.addClaimItem(item).then(
      res => dispatch(success(res.claimItem, item.claim_id)),
      error => dispatch(failure(error))
    )
  };
  function request() { return { type: claimItemsConstants.ADD_CLAIM_ITEM }}
  function success(newClaimItem, claimId) { return { type: claimItemsConstants.ADD_CLAIM_ITEM_SUCCESS, newClaimItem, claimId }}
  function failure(error) { return { type: claimItemsConstants.ADD_CLAIM_ITEM_FAILURE, error }}
}

function editClaimItem(item, id) {
  return dispatch => {
    dispatch(request());
    return claimItemsAPI.editClaimItem(item, id).then(
      res => dispatch(success(res.claimItem, item.claim_id)),
      error => dispatch(failure(error))
    )
  };
  function request() { return { type: claimItemsConstants.EDIT_CLAIM_ITEM }}
  function success(newClaimItem, claimId) { return { type: claimItemsConstants.EDIT_CLAIM_ITEM_SUCCESS, newClaimItem, claimId }}
  function failure(error) { return { type: claimItemsConstants.EDIT_CLAIM_ITEM_FAILURE, error }}
}

function deleteClaimItem(claim_id, claim_item_id) {
  return dispatch => {
    dispatch(request());
    return claimItemsAPI.deleteClaimItem(claim_item_id).then(
      res => dispatch(success(claim_id, claim_item_id)),
      error => {
        return dispatch(failure(error))
      }
    )
  };
  function request() { return { type: claimItemsConstants.DELETE_CLAIM_ITEM_REQUEST }}
  function success(claim_id, claim_item_id) { return { type: claimItemsConstants.DELETE_CLAIM_ITEM_SUCCESS, claim_id, claim_item_id }}
  function failure(error) { return { type: claimItemsConstants.DELETE_CLAIM_ITEM_FAILURE, error }}
}

function requestAll(claim_id) {
  return dispatch => {
    dispatch(request());
    return claimItemsAPI.requestAll(claim_id).then(
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
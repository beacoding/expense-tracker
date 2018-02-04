import { claimItemsConstants } from '../constants';
import { claimItemsAPI } from '../api'

export const claimItemsActions = {
    addClaimItem,
    removeClaimItem,
    requestAll
};

function addClaimItem() {
  //TODO add claim
}

function removeClaimItem() {
  //TODO remove claim
}

function requestAll(claimID) {
  //TODO fetch all with claim id
  return dispatch => {
    dispatch(request());
    claimItemsAPI.requestAll(claimID)
      .then(
          res => {
            dispatch(success(res.claimItems, claimID)) 
          }
          ,
          error => {
            dispatch(failure(error))
          }
      );
  };

  function request() { return { type: claimItemsConstants.REQUEST_CLAIM_ITEMS } }
  function success(claimItems, claimID) { return { type: claimItemsConstants.RECEIVE_CLAIM_ITEMS, claimID, claimItems }}
  function failure(error) { return { type: claimItemsConstants.FAILURE_CLAIM_ITEMS, error }}
}
import { claimItemsConstants } from '../constants';

const initialState = {isFetching: true}

const claimItems = (state = initialState, action) => {
  switch (action.type) {
    case claimItemsConstants.ADD_CLAIM_ITEM:
      //TODO: change state of claim items
    case claimItemsConstants.REMOVE_CLAIM_ITEM:
      //TODO: change state of claim items
    case claimItemsConstants.REQUEST_CLAIM_ITEMS:
      return {
        isFetching: true
      }
    case claimItemsConstants.RECEIVE_CLAIM_ITEMS:
      const obj = Object.assign({}, state);
      obj.isFetching = false
      obj[action.claimID] = action.claimItems;
      return obj;
    case claimItemsConstants.FAILURE_CLAIM_ITEMS:
      return {
        error: action.error
      }
    default:
      return state;
  }
}

export default claimItems;
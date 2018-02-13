import { claimItemsConstants } from '../constants';

const initialState = {isFetching: true}

const claimItems = (state = initialState, action) => {
  switch (action.type) {
    case claimItemsConstants.ADD_CLAIM_ITEM:
      return {
        isFetching: true
      }
    case claimItemsConstants.ADD_CLAIM_ITEM_SUCCESS:
      return {
        isFetching: false
      }
    case claimItemsConstants.ADD_CLAIM_ITEM_FAILURE:
      return {
        isFetching: false,
        error: action.error
      }

    case claimItemsConstants.REMOVE_CLAIM_ITEM:
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
    case claimItemsConstants.CLEAR_CLAIM_ITEMS:
      return {
        isFetching: false
      }
    default:
      return state;
  }
}

export default claimItems;
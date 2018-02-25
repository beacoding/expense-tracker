import { claimItemsConstants } from '../constants';

const initialState = {
  isFetching: false,
  claimItemsMap: {},
  error: undefined
}

const claimItems = (state = initialState, action) => {
  let newClaimItemsMap;
  
  switch (action.type) {
    // ADD CLAIM ITEM
    case claimItemsConstants.ADD_CLAIM_ITEM:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimItemsConstants.ADD_CLAIM_ITEM_SUCCESS:
      // TODO: append the newly created claimItem to claimItemsMap
      return Object.assign({}, state, {
        isFetching: false,
        error: undefined
      });
    case claimItemsConstants.ADD_CLAIM_ITEM_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        error: action.error
      });
    // REMOVE CLAIM ITEM
    case claimItemsConstants.REMOVE_CLAIM_ITEM:
      return state;
    // FETCH CLAIM ITEMS
    case claimItemsConstants.REQUEST_CLAIM_ITEMS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimItemsConstants.RECEIVE_CLAIM_ITEMS:
      newClaimItemsMap = state.claimItemsMap;
      if (action.claimItems.length == 0) {
        newClaimItemsMap[action.claimId] = []
      }
      action.claimItems.forEach((claimItem) => {
        newClaimItemsMap[action.claimId] = action.claimItems;
      });
      return Object.assign({}, state, {
        isFetching: false,
        claimItemsMap: newClaimItemsMap,
        error: undefined
      });
    case claimItemsConstants.FAILURE_CLAIM_ITEMS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    // CLEAR CLAIM ITEMS
    case claimItemsConstants.CLEAR_CLAIM_ITEMS:
      return Object.assign({}, state, {
        isFetching: false,
        claimItemsMap: {},
        error: undefined
      });
    default:
      return state;
  }
}

export default claimItems;
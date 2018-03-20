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
    case claimItemsConstants.ADD_CLAIM_ITEM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimItemsConstants.ADD_CLAIM_ITEM_SUCCESS:
      let newItem = action.newClaimItem[0];
      let claim_id = action.claimId;
      newClaimItemsMap = Object.assign({}, state.claimItemsMap);
      if (newClaimItemsMap[claim_id] === undefined) {
        newClaimItemsMap[claim_id] = {}
      } 
      newClaimItemsMap[claim_id][newItem.claim_item_id] = newItem
      return Object.assign({}, state, {
        isFetching: false,
        claimItemsMap: newClaimItemsMap,
        error: undefined
      });
    case claimItemsConstants.ADD_CLAIM_ITEM_FAILURE:
      return state;

    // EDIT CLAIM ITEM
    case claimItemsConstants.EDIT_CLAIM_ITEM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimItemsConstants.EDIT_CLAIM_ITEM_SUCCESS:
      newClaimItemsMap = Object.assign({}, state.claimItemsMap);
      newClaimItemsMap[parseInt(action.claimId)][action.id] = action.newClaimItem;
      return Object.assign({}, state, {
        isFetching: false,
        claimItemsMap: newClaimItemsMap,
        error: undefined
      });
    case claimItemsConstants.EDIT_CLAIM_ITEM_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        error: action.error
      });
      
    // REMOVE CLAIM ITEM
    case claimItemsConstants.DELETE_CLAIM_ITEM_REQUEST:
      return state;
    case claimItemsConstants.DELETE_CLAIM_ITEM_SUCCESS:
      newClaimItemsMap = Object.assign({}, state.claimItemsMap);
      delete newClaimItemsMap[parseInt(action.claim_id)][action.claim_item_id];
      return Object.assign({}, state, {
        isFetching: false,
        claimItemsMap: newClaimItemsMap,
        error: undefined
      });
    case claimItemsConstants.DELETE_CLAIM_ITEM_FAILURE:
      return state;
    // FETCH CLAIM ITEMS
    case claimItemsConstants.REQUEST_CLAIM_ITEMS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimItemsConstants.RECEIVE_CLAIM_ITEMS:
      newClaimItemsMap = Object.assign({}, state.claimItemsMap);
      if (action.claimItems.length == 0) {
        newClaimItemsMap[action.claimId] = {}
      }
      action.claimItems.forEach((claimItem) => {
        if (newClaimItemsMap[action.claimId] === undefined) {
          newClaimItemsMap[action.claimId] = {};
        }
        newClaimItemsMap[action.claimId][claimItem.claim_item_id] = claimItem;
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
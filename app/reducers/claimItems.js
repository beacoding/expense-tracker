import { claimItemsConstants } from '../constants';

const initialState = {}

const claimItems = (state = initialState, action) => {
  switch (action.type) {
    case claimItemsConstants.ADD_CLAIM_ITEM:
      //TODO: change state of claim items
    case claimItemsConstants.REMOVE_CLAIM_ITEM:
      //TODO: change state of claim items
    default:
      return state;
  }
}

export default claimItems;
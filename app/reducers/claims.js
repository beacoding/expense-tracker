import { claimsConstants } from '../constants';

const initialState = {}

const claims = (state = initialState, action) => {
  switch (action.type) {
    case claimsConstants.ADD_CLAIM:
      //TODO: change state of claim items
    case claimsConstants.REMOVE_CLAIM:
      //TODO: change state of claim items
    default:
      return state;
  }
}

export default claims;

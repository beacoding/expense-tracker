import { claimsConstants } from '../constants';

const initialState = {isFetching: false}

const claims = (state = initialState, action) => {
  switch (action.type) {
    case claimsConstants.ADD_CLAIM:
      //TODO: change state of claim items
    case claimsConstants.REMOVE_CLAIM:
      //TODO: change state of claim items
    case claimsConstants.REQUEST_CLAIMS:
      return {
        isFetching: true
      }
    case claimsConstants.RECEIVE_CLAIMS:
      return {
        claimsList: action.claims
      }
    case claimsConstants.FAILURE_CLAIMS:
      return {
        error: action.error
      }
    default:
      return state;
  }
}

export default claims;

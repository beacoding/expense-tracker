import { claimsConstants } from '../constants';

const initialState = {isFetching: true}

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
      const obj = Object.assign({}, state);
      obj.isFetching = false;
      obj.claimsMap = obj.claimsMap || {};
      action.claims.forEach((claim) => {
        obj.claimsMap[claim.claim_id] = claim;
      });
      return obj;
      // return {
      //   claimsList: action.claims,
      //   isFetching: false
      // }
    case claimsConstants.FAILURE_CLAIMS:
      return {
        error: action.error
      }
    default:
      return state;
  }
}

export default claims;

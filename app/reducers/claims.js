import { claimsConstants } from '../constants';

const initialState = {isFetching: true}

const claims = (state = initialState, action) => {
  switch (action.type) {
    case claimsConstants.ADD_CLAIM_REQUEST:
      const objA = Object.assign({}, state);
      objA.isFetching = true;
      objA.claimsMap = objA.claimsMap;
      return objA;
    case claimsConstants.ADD_CLAIM_SUCCESS:
    const currentState = Object.assign({}, state);
      return {
        claimsMap: currentState.claimsMap,
        isFetching: false,
        claimID: action.claimID
      }
    case claimsConstants.ADD_CLAIM_FAILURE:
      return {
        isFetching: false,
        error: action.error
      }
    case claimsConstants.REMOVE_CLAIM_REQUEST:
    case claimsConstants.REMOVE_CLAIM_SUCCESS:
    case claimsConstants.UPDATE_CLAIM_STATUS_REQUEST:
      return {
        isFetching: true
      }
    case claimsConstants.UPDATE_CLAIM_STATUS_SUCCESS:
      return {
        isFetching: false
      }
    case claimsConstants.UPDATE_CLAIM_STATUS_FAILURE:
      return {
        isFetching: false,
        error: action.error
      }
    case claimsConstants.REQUEST_CLAIMS:
      return {
        isFetching: true
      }
    case claimsConstants.RECEIVE_CLAIMS:
      const objD = Object.assign({}, state);
      objD.isFetching = false;
      objD.claimsMap = objD.claimsMap || {};
      action.claims.forEach((claim) => {
        objD.claimsMap[claim.claim_id] = claim;
      });
      return objD;
      // return {
      //   claimsList: action.claims,
      //   isFetching: false
      // }
    case claimsConstants.FAILURE_CLAIMS:
      return {
        isFetching: false,
        error: action.error
      }
    case claimsConstants.REQUEST_PENDING_APPROVALS:
      return {
        isFetching: true
      }
    case claimsConstants.RECEIVE_PENDING_APPROVALS:
      const objB = Object.assign({}, state);
      objB.isFetching = false;
      objB.claimsMap = objB.claimsMap || {};
      action.claims.forEach((claim) => {
        objB.claimsMap[claim.claim_id] = claim;
      });
      return objB;
      // return {
      //   claimsList: action.claims,
      //   isFetching: false
      // }
    case claimsConstants.FAILURE_PENDING_APPROVALS:
      return {
        isFetching: false,
        error: action.error
      }
    case claimsConstants.CLEAR_CLAIMS:
      return {
        isFetching: false
    }
    default:
      return state;
  }
}

export default claims;

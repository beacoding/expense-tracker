import { claimsConstants } from '../constants';

const initialState = {
  isFetching: false,
  claimsMap: {},
  claimId: -1,
  error: undefined,
  currentClaim: {}
}

const claims = (state = initialState, action) => {
  let newClaimsMap;

  switch (action.type) {
    // ADD CLAIM
    case claimsConstants.ADD_CLAIM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.ADD_CLAIM_SUCCESS:
      // append stub of the newly created claim to claimsMap
      action.claim.claim_id = action.claimId;
      action.claim.claimee_first_name = 'Processing...';
      action.claim.claimee_last_name = '';
      action.claim.approver_first_name = 'Processing...';
      action.claim.approver_last_name = '';
      action.claim.company_name = 'Processing...';
      action.claim.date_created = Date.now();
      newClaimsMap = state.claimsMap;
      newClaimsMap[action.claimId] = action.claim;
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        claimId: action.claimId,
        error: undefined
      });
    case claimsConstants.ADD_CLAIM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REMOVE CLAIM
    case claimsConstants.REMOVE_CLAIM_REQUEST:
      return state;
    case claimsConstants.REMOVE_CLAIM_SUCCESS:
      return state;
    case claimsConstants.REMOVE_CLAIM_FAILURE:
      return state;

    // UPDATE CLAIM STATUS
    case claimsConstants.UPDATE_CLAIM_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.UPDATE_CLAIM_STATUS_SUCCESS:
      // remove updated claim
      newClaimsMap = state.claimsMap;
      delete newClaimsMap[action.claim_id];
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.UPDATE_CLAIM_STATUS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // FETCH CLAIMS
    case claimsConstants.REQUEST_CLAIMS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_CLAIMS:
      newClaimsMap = {};
      action.claims.forEach((claim) => {
        newClaimsMap[claim.claim_id] = claim;
      });
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.FAILURE_CLAIMS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // FETCH ONE CLAIM
    case claimsConstants.REQUEST_CLAIM:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_CLAIM:
      newClaimsMap = {}
      newClaimsMap[action.claim.claim_id] = action.claim;
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.FAILURE_CLAIM:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // FETCH CLAIMS FOR APPROVAL
    case claimsConstants.REQUEST_PENDING_APPROVALS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case claimsConstants.RECEIVE_PENDING_APPROVALS:
      newClaimsMap = {};
      action.claims.forEach((claim) => {
        newClaimsMap[claim.claim_id] = claim;
      });
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: newClaimsMap,
        error: undefined
      });
    case claimsConstants.FAILURE_PENDING_APPROVALS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
      
    // CLEAR CLAIMS
    case claimsConstants.CLEAR_CLAIMS:
      return Object.assign({}, state, {
        isFetching: false,
        claimsMap: {},
        claimId: -1,
        error: undefined
      });
    default:
      return state;
  }
}

export default claims;

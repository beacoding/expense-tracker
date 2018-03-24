import { approvalLimitsConstants, policiesConstants } from '../constants';

const initialState = { 
  isFetching: false,
  limitsMap: {},
  managerOptions: [],
  error: undefined,
  errorAddApprovalLimit: undefined,
  params: {},
  cost_centres: [],
  companies: [],
  expense_types: [],
  policies: {}
}

const policies = (state = initialState, action) => {
  let newLimitsMap;
  let newManagerOptions;

  switch (action.type) {
    // REQUEST LIST OF COST CENTRES
    case approvalLimitsConstants.REQUEST_COST_CENTRES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.RECEIVE_COST_CENTRES:
      return Object.assign({}, state, {
        isFetching: false,
        cost_centres: action.cost_centres
      });
    case approvalLimitsConstants.FAILURE_COST_CENTRES:
      return Object.assign({}, state, {
        error: action.error
      });
    
    // ADD APPROVAL LIMIT
    case approvalLimitsConstants.ADD_APPROVAL_LIMIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorAddApprovalLimit: undefined
      });
    case approvalLimitsConstants.ADD_APPROVAL_LIMIT_SUCCESS:
      newLimitsMap = Object.assign({}, state.limitsMap);
      if (newLimitsMap[action.new_limit.cost_centre_id] === undefined) {
        newLimitsMap[action.new_limit.cost_centre_id] = {};
      }
      newLimitsMap[action.new_limit.cost_centre_id][action.new_limit.employee_id] = action.new_limit;
      return Object.assign({}, state, {
        isFetching: false,
        limitsMap: newLimitsMap,
        errorAddApprovalLimit: undefined
      });
    case approvalLimitsConstants.ADD_APPROVAL_LIMIT_FAILURE:
      return Object.assign({}, state, {
        errorAddApprovalLimit: action.error
      });
    // UPDATE APPROVAL LIMIT
    case approvalLimitsConstants.UPDATE_APPROVAL_LIMIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.UPDATE_APPROVAL_LIMIT_SUCCESS:
      newLimitsMap = Object.assign({}, state.limitsMap);
      if (action.new_limit.approval_limit === null) {
        newLimitsMap[action.new_limit.cost_centre_id][action.new_limit.employee_id].approval_limit = null;
      } else {
        newLimitsMap[action.new_limit.cost_centre_id][action.new_limit.employee_id].approval_limit = parseFloat(action.new_limit.approval_limit);
      }
      return Object.assign({}, state, {
        isFetching: false,
        limitsMap: newLimitsMap,
        error: undefined
      });
    case approvalLimitsConstants.UPDATE_APPROVAL_LIMIT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REVOKE APPROVAL LIMIT
    case approvalLimitsConstants.REVOKE_APPROVAL_LIMIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.REVOKE_APPROVAL_LIMIT_SUCCESS:
      newLimitsMap = Object.assign({}, state.limitsMap);
      delete newLimitsMap[action.revoked_limit.cost_centre_id][action.revoked_limit.employee_id];
      return Object.assign({}, state, {
        isFetching: false,
        limitsMap: newLimitsMap,
        error: undefined
      });
    case approvalLimitsConstants.REVOKE_APPROVAL_LIMIT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REQUEST ALL APPROVAL LIMITS
    case approvalLimitsConstants.REQUEST_ALL_LIMITS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.RECEIVE_ALL_LIMITS:
      newLimitsMap = {};
      action.limits.forEach((limit) => {
        if (newLimitsMap[limit.cost_centre_id] === undefined) {
          newLimitsMap[limit.cost_centre_id] = {};
        }
        newLimitsMap[limit.cost_centre_id][limit.employee_id] = limit;
      });
      return Object.assign({}, state, {
        isFetching: false,
        limitsMap: newLimitsMap,
        error: undefined
      });
    case approvalLimitsConstants.FAILURE_ALL_LIMITS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REQUEST COMPANIES FROM DB
    case policiesConstants.REQUEST_COMPANIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case policiesConstants.RECEIVE_COMPANIES:
      return Object.assign({}, state, {
        isFetching: false,
        companies: action.companies,
        error: undefined
      });
    case policiesConstants.FAILURE_COMPANIES:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REQUEST EXPENSE TYPES FROM DB
    case policiesConstants.REQUEST_EXPENSE_TYPES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case policiesConstants.RECEIVE_EXPENSE_TYPES:
      return Object.assign({}, state, {
        isFetching: false,
        expense_types: action.expense_types,
        error: undefined
      });
    case policiesConstants.FAILURE_EXPENSE_TYPES:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REQUEST POLICIES
    case policiesConstants.REQUEST_POLICIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case policiesConstants.RECEIVE_POLICIES:
      let policies = {}
      action.policies.forEach((policy) => {
        policies[policy.name] = policy.value;
      });
      return Object.assign({}, state, {
        isFetching: false,
        policies: policies,
        error: undefined
      });
    case policiesConstants.FAILURE_POLICIES:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REQUEST UPDATE POLICIES
    case policiesConstants.UPDATE_POLICIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case policiesConstants.UPDATE_POLICIES_SUCCESS:
      let newPolicies = Object.assign({}, state.policies)
      newPolicies[action.name] = action.value 
      return Object.assign({}, state, {
        isFetching: false,
        policies: newPolicies,
        error: undefined
      });
    case policiesConstants.UPDATE_POLICIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REQUESTING APPROVAL LIMITS BY USER
    case approvalLimitsConstants.REQUEST_USER_LIMITS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.RECEIVE_USER_LIMITS:
      newLimitsMap = {};
      action.limits.forEach((limit) => {
        newLimitsMap[limit.cost_centre_id] = {};
        newLimitsMap[limit.cost_centre_id][limit.employee_id] = limit;
      });
      return Object.assign({}, state, {
        isFetching: false,
        limitsMap: newLimitsMap,
        error: undefined
      });
    case approvalLimitsConstants.FAILURE_USER_LIMITS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    // REQUESTING FORWARD ELIGIBLE MANAGERS
    case approvalLimitsConstants.REQUEST_FORWARD_MANAGERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.RECEIVE_FORWARD_MANAGERS:
      newManagerOptions = [];
      action.managers.forEach((manager) => {
        newManagerOptions.push({
          'label': manager.manager_name,
          'value': manager.employee_id
        });
      });
      return Object.assign({}, state, {
        isFetching: false,
        managerOptions: newManagerOptions,
        error: undefined
      });
    case approvalLimitsConstants.FAILURE_FORWARD_MANAGERS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case approvalLimitsConstants.MODIFY_PARAMS:
      var param_to_change = action.param_to_change;
      var value = action.value
      var newParams = Object.assign({}, state.params);
      newParams[param_to_change] = value;
      return Object.assign({}, state, {
        params: newParams
      });

    // DEFAULT
    default:
      return state;
  }
}

export default policies;
import { approvalLimitsConstants } from '../constants';

const initialState = { 
  isFetching: false,
  limitsMap: {},
  managerOptions: [],
  error: undefined,
  params: {}
}

const policies = (state = initialState, action) => {
  let newLimitsMap;
  let newManagerOptions;

  switch (action.type) {
    // REQUESTING ALL APPROVAL LIMITS
    case approvalLimitsConstants.REQUEST_UPDATE_APPROVAL_LIMIT:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.SUCCESS_UPDATE_APPROVAL_LIMIT:
      return Object.assign({}, state, {
        isFetching: false
      });
    case approvalLimitsConstants.FAILURE_UPDATE_APPROVAL_LIMIT:
      return Object.assign({}, state, {
        error: action.error
      });
    case approvalLimitsConstants.REQUEST_ALL_LIMITS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.RECEIVE_ALL_LIMITS:
      newLimitsMap = {};
      action.limits.forEach((limit) => {
        newLimitsMap[limit.cost_centre_id] = limit;
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
    // REQUESTING APPROVAL LIMITS BY USER
    case approvalLimitsConstants.REQUEST_USER_LIMITS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case approvalLimitsConstants.RECEIVE_USER_LIMITS:
      newLimitsMap = {};
      action.limits.forEach((limit) => {
        newLimitsMap[limit.cost_centre_id] = limit;
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
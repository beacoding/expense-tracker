import { approvalLimitsConstants } from '../constants';

const initialState = {isFetching: true}

const approvalLimits = (state = initialState, action) => {
  switch (action.type) {
    // REQUESTING ALL APPROVAL LIMITS
    case approvalLimitsConstants.REQUEST_ALL_LIMITS:
      return {
        isFetching: true
      }
    case approvalLimitsConstants.RECEIVE_ALL_LIMITS:
      const objA = Object.assign({}, state);
      objA.isFetching = false;
      objA.limitsMap = objA.limitsMap || {};
      action.limits.forEach((limit) => {
        objA.limitsMap[limit.cost_centre_id] = limit;
      });
      return objA;
    case approvalLimitsConstants.FAILURE_ALL_LIMITS:
      return {
        error: action.error
      }
    // REQUESTING APPROVAL LIMITS BY USER
    case approvalLimitsConstants.REQUEST_USER_LIMITS:
      return {
        isFetching: true
      }
    case approvalLimitsConstants.RECEIVE_USER_LIMITS:
      const objB = Object.assign({}, state);
      objB.isFetching = false;
      objB.limitsMap = objB.limitsMap || {};
      action.limits.forEach((limit) => {
        objB.limitsMap[limit.cost_centre_id] = limit;
      });
      return objB;
    case approvalLimitsConstants.FAILURE_USER_LIMITS:
      return {
        error: action.error
      }
    // REQUESTING FORWARD ELIGIBLE MANAGERS
    case approvalLimitsConstants.REQUEST_FORWARD_MANAGERS:
      const currentState = Object.assign({}, state);
      return {
        limitsMap: currentState.limitsMap,
        isFetching: true
      }
    case approvalLimitsConstants.RECEIVE_FORWARD_MANAGERS:
      const objC = Object.assign({}, state);
      objC.isFetching = false;
      objC.limitsMap = objC.limitsMap || {};
      objC.managerOptions = objC.managerOptions || [];
      action.managers.forEach((manager) => {
        objC.managerOptions.push({
          'label': manager.manager_name,
          'value': manager.employee_id
        });
      });
      return objC;
    case approvalLimitsConstants.FAILURE_FORWARD_MANAGERS:
      return {
        error: action.error
      }
    // DEFAULT
    default:
      return state;
  }
}

export default approvalLimits;
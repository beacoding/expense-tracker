import { employeesConstants } from '../constants';

const initialState = {
  employees: [],
  employeesOfManagerMap: {},
}

const reports = (state = initialState, action) => {
  switch (action.type) {
    case employeesConstants.REQUEST_EMPLOYEES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.RECEIVE_EMPLOYEES:
      return Object.assign({}, state, {
        isFetching: false,
        employees: action.employees,
        error: undefined
      });
    case employeesConstants.FAILURE_EMPLOYEES:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case employeesConstants.REQUEST_EMPLOYEES_OF_MANAGER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.RECEIVE_EMPLOYEES_OF_MANAGER:
      var newMap = Object.assign({}, state.employeesOfManagerMap);
      newMap[action.manager_id] = action.employees
      return Object.assign({}, state, {
        isFetching: false,
        employeesOfManagerMap: newMap,
        error: undefined
      });
    case employeesConstants.FAILURE_EMPLOYEES_OF_MANAGER:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default reports;
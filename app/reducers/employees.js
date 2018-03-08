import { employeesConstants } from '../constants';

const initialState = {
  employees: [],
  employees_with_managers: [],
  employeesOfManagerMap: {},
  current_employee: null
}

const reports = (state = initialState, action) => {
  switch (action.type) {
    case employeesConstants.REQUEST_UPDATE_PASSWORD:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.SUCCESS_UPDATE_PASSWORD:
      return Object.assign({}, state, {
        isFetching: false
      });
    case employeesConstants.FAILURE_UPDATE_PASSWORD:
      return Object.assign({}, state, {
        error: action.error
      });
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
    case employeesConstants.REQUEST_EMPLOYEE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.RECEIVE_EMPLOYEE:
      return Object.assign({}, state, {
        isFetching: false,
        current_employee: action.employee[0],
        error: undefined
      });
    case employeesConstants.FAILURE_EMPLOYEE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case employeesConstants.REQUEST_DISABLE_EMPLOYEE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.SUCCESS_DISABLE_EMPLOYEE:
      var newCurrentEmployee = Object.assign({}, state.current_employee);
      newCurrentEmployee.is_active = 0;
      return Object.assign({}, state, {
        isFetching: false,
        current_employee: newCurrentEmployee,
        error: undefined
      });
    case employeesConstants.FAILURE_DISABLE_EMPLOYEE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case employeesConstants.REQUEST_ENABLE_EMPLOYEE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.SUCCESS_ENABLE_EMPLOYEE:
      var newCurrentEmployee = Object.assign({}, state.current_employee);
      newCurrentEmployee.is_active = 1;
      return Object.assign({}, state, {
        isFetching: false,
        current_employee: newCurrentEmployee,
        error: undefined
      });
    case employeesConstants.FAILURE_ENABLE_EMPLOYEE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case employeesConstants.REQUEST_EMPLOYEES_WITH_MANAGERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.RECEIVE_EMPLOYEES_WITH_MANAGERS:
      return Object.assign({}, state, {
        isFetching: false,
        employees_with_managers: action.employees,
        error: undefined
      });
    case employeesConstants.FAILURE_EMPLOYEES_WITH_MANAGERS:
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
import { employeesConstants } from '../constants';

const initialState = {
  employees: [],
  employees_with_managers: [],
  employeesOfManagerMap: {},
  current_employee: null,
  params: {}
}

const employees = (state = initialState, action) => {
  switch (action.type) {
    // ADD USER
    case employeesConstants.ADD_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.ADD_EMPLOYEE_SUCCESS:
      var newEmployee = {};
      newEmployee["id"] = action.newEmployee.id;
      newEmployee["employee_name"] = action.newEmployee.first_name + " " + action.newEmployee.last_name;
      newEmployee["is_active"] = 1;
      var employeesWithAddition = state.employees;
      employeesWithAddition.push(newEmployee);
      return Object.assign({}, state, {
        isFetching: false,
        employees: employeesWithAddition,
        employees_with_managers: action.employees,
        error: undefined
      });
    case employeesConstants.ADD_EMPLOYEE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    // UPDATE PASSWORD
    case employeesConstants.UPDATE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.UPDATE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: undefined
      });
    case employeesConstants.UPDATE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
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
    case employeesConstants.DISABLE_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.DISABLE_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employees_with_managers: action.employees,
        error: undefined
      });
    case employeesConstants.DISABLE_EMPLOYEE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case employeesConstants.ENABLE_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.ENABLE_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employees_with_managers: action.employees,
        error: undefined
      });
    case employeesConstants.ENABLE_EMPLOYEE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case employeesConstants.TOGGLE_ADMIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.TOGGLE_ADMIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employees_with_managers: action.employees,
        error: undefined
      });
    case employeesConstants.TOGGLE_ADMIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case employeesConstants.ASSIGN_MANAGER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.ASSIGN_MANAGER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employees_with_managers: action.employees,
        error: undefined
      });
    case employeesConstants.ASSIGN_MANAGER_FAILURE:
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
    case employeesConstants.MODIFY_PARAMS:
      var param_to_change = action.param_to_change;
      var value = action.value
      var newParams = Object.assign({}, state.params);
      newParams[param_to_change] = value;
      return Object.assign({}, state, {
        params: newParams
      });
    case employeesConstants.REQUEST_WITH:
      return Object.assign({}, state, {
        isFetching: true
      });
    case employeesConstants.RECEIVE_WITH:
      return Object.assign({}, state, {
        isFetching: false,
        employees_with_managers: action.employees,
        error: undefined
      });
    case employeesConstants.FAILURE_WITH:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default employees;
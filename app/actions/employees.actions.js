import { employeesConstants } from '../constants';
import { employeesAPI } from '../api'

export const employeesActions = {
  requestAll,
  requestAllWithManagers,
  requestEmployees,
  requestEmployee,
  addEmployee,
  updatePassword,
  enableEmployee,
  disableEmployee,
  modifyParams,
  requestWith
};

function requestAll() {
  return dispatch => {
    dispatch(request());
    return employeesAPI.requestAll().then(
      res => {
        dispatch(success(res.employees))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_EMPLOYEES }}
  function success(employees) { return { type: employeesConstants.RECEIVE_EMPLOYEES, employees }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEES, error }}
}

function requestAllWithManagers() {
  return dispatch => {
    dispatch(request());
    return employeesAPI.requestAllWithManagers().then(
      res => {
        dispatch(success(res.employees))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_EMPLOYEES_WITH_MANAGERS }}
  function success(employees) { return { type: employeesConstants.RECEIVE_EMPLOYEES_WITH_MANAGERS, employees }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEES_MANAGERS, error }}
}

function updatePassword(employee) {
  return dispatch => {
    dispatch(request());
    return employeesAPI.updatePassword(employee).then(
      res => dispatch(success()),
      error => dispatch(failure(error))
      )
  }
  
  function request() { return { type: employeesConstants.UPDATE_PASSWORD_REQUEST }}
  function success() { return { type: employeesConstants.UPDATE_PASSWORD_SUCCESS }}
  function failure(error) { return { type: employeesConstants.UPDATE_PASSWORD_FAILURE, error }}
}

function requestEmployees(manager_id) {
  return dispatch => {
    dispatch(request());
    return employeesAPI.requestEmployees(manager_id).then(
      res => {
        dispatch(success(res.employees))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_EMPLOYEES_OF_MANAGER }}
  function success(employees) { return { type: employeesConstants.RECEIVE_EMPLOYEES_OF_MANAGER, employees, manager_id }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEES_OF_MANAGER, error }}
}

function disableEmployee(employee_id, manager_id) {
  return dispatch => {
    dispatch(request(employee_id));
    return employeesAPI.disableEmployee(employee_id, manager_id).then(
      res => {
        dispatch(success(employee_id))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request(employee_id) { return { type: employeesConstants.DISABLE_EMPLOYEE_REQUEST, employee_id }}
  function success(employee_id) { return { type: employeesConstants.DISABLE_EMPLOYEE_SUCCESS, employee_id }}
  function failure(error) { return { type: employeesConstants.DISABLE_EMPLOYEE_FAILURE, error }}
}

function enableEmployee(employee_id) {
  return dispatch => {
    dispatch(request(employee_id));
    return employeesAPI.enableEmployee(employee_id).then(
      res => {
        dispatch(success(employee_id))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request(employee_id) { return { type: employeesConstants.ENABLE_EMPLOYEE_REQUEST, employee_id }}
  function success(employee_id) { return { type: employeesConstants.ENABLE_EMPLOYEE_SUCCESS, employee_id }}
  function failure(error) { return { type: employeesConstants.ENABLE_EMPLOYEE_FAILURE, error }}
}

function requestWith(params) {
  return dispatch => {
    dispatch(request());
    employeesAPI.requestWith(params)
    .then(
      res => {
        dispatch(success(res.employees))
      },
      error => dispatch(failure(error))
    );

    function request() { return { type: employeesConstants.REQUEST_WITH }}
    function success(employees) { return { type: employeesConstants.RECEIVE_WITH, employees }}
    function failure(error) { return { type: employeesConstants.FAILURE_WITH, error }}
  }
}

function requestEmployee(employee_id) {
  return dispatch => {
    dispatch(request());
    return employeesAPI.requestEmployee(employee_id).then(
      res => {
        dispatch(success(res.employee))
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_EMPLOYEE }}
  function success(employee) { return { type: employeesConstants.RECEIVE_EMPLOYEE, employee }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEE, error }}
}

function addEmployee(newEmployee) {
  return dispatch => {
    dispatch(request(newEmployee));
    return employeesAPI.addEmployee(newEmployee).then(
      res => dispatch(success(newEmployee, res.employees)),
      error => dispatch(failure(error))
    )
  };
  function request(newEmployee) { return { type: employeesConstants.ADD_EMPLOYEE_REQUEST, newEmployee }}
  function success(newEmployee, employees) { return { type: employeesConstants.ADD_EMPLOYEE_SUCCESS, newEmployee, employees }}
  function failure(error) { return { type: employeesConstants.ADD_EMPLOYEE_FAILURE, error }}
}

function modifyParams(param_to_change, value) {
  return { type: employeesConstants.MODIFY_PARAMS, param_to_change, value };
}

import { employeesConstants } from '../constants';
import { employeesAPI } from '../api'

export const employeesActions = {
  requestAll,
  requestAllWithManagers,
  requestEmployees,
  requestEmployee,
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
      res => dispatch(success(name)),
      error => dispatch(failure(error))
      )
  }
  
  function request() { return { type: employeesConstants.REQUEST_UPDATE_PASSWORD }}
  function success(id) { return { type: employeesConstants.SUCCESS_UPDATE_PASSWORD, id }}
  function failure(error) { return { type: employeesConstants.FAILURE_UPDATE_PASSWORD, error }}
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
    dispatch(request());
    return employeesAPI.disableEmployee(employee_id, manager_id).then(
      res => {
        dispatch(success())
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_DISABLE_EMPLOYEE }}
  function success() { return { type: employeesConstants.SUCCESS_DISABLE_EMPLOYEE }}
  function failure(error) { return { type: employeesConstants.FAILURE_DISABLE_EMPLOYEE, error }}
}

function enableEmployee(employee_id) {
  return dispatch => {
    dispatch(request());
    return employeesAPI.enableEmployee(employee_id).then(
      res => {
        dispatch(success())
      },
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_ENABLE_EMPLOYEE }}
  function success() { return { type: employeesConstants.SUCCESS_ENABLE_EMPLOYEE }}
  function failure(error) { return { type: employeesConstants.FAILURE_ENABLE_EMPLOYEE, error }}
}

function requestWith(params) {
  return dispatch => {
    dispatch(request());
    approvalLimitsAPI.requestWith(params)
    .then(
      res => {
        dispatch(success(res.employees))
      },
      error => dispatch(failure(error))
    );

    function request() { return { type: approvalLimitsConstants.REQUEST_WITH }}
    function success(employees) { return { type: approvalLimitsConstants.RECEIVE_WITH, employees }}
    function failure(error) { return { type: approvalLimitsConstants.FAILURE_WITH, error }}
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

function modifyParams(param_to_change, value) {
  return { type: employeesConstants.MODIFY_PARAMS, param_to_change, value };
}

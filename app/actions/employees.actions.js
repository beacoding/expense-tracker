import { employeesConstants } from '../constants';
import { employeesAPI } from '../api'

export const employeesActions = {
  requestAll,
  requestEmployees,
  updatePassword
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

function updatePassword(id) {
  return dispatch => {
    dispatch(request());
    return employeesAPI.updatePassword(id).then(
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
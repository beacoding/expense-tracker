import { apiHelpers } from '../helpers'

export const employeesAPI = {
  addEmployee,
  requestAll,
  requestAllWithManagers,
  requestEmployees,
  requestEmployee,
  disableEmployee,
  enableEmployee,
  updatePassword,
  resetPassword,  
  requestWith
};

function addEmployee(employee) {
  return fetch('/employees/create', apiHelpers.postOptions(employee))
   .then(res => apiHelpers.handleResponse(res));
}

function requestAll() {
  return fetch(`/employees/all`, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function disableEmployee(employee_id, manager_id) {
  return fetch(`/employees/disable_employee`, apiHelpers.postOptions({employee_id: employee_id, manager_id: manager_id}))
  .then(apiHelpers.handleResponse);
}

function enableEmployee(employee_id) {
  return fetch(`/employees/enable_employee`, apiHelpers.postOptions({employee_id: employee_id}))
  .then(apiHelpers.handleResponse);
}

function requestAllWithManagers() {
  return fetch(`/employees/all_with_managers`, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestAll() {
  return fetch(`/employees/all`, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestEmployees(manager_id) {
  return fetch(`/employees/with_manager?manager_id=` + manager_id, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function requestEmployee(employee_id) {
  return fetch(`/employees/with_employee?employee_id=` + employee_id, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

function updatePassword(employee) {
  return fetch(`/employees/update_password`, apiHelpers.postOptions(employee))
  .then(apiHelpers.handleResponse);
}

function resetPassword(employee) {
  return fetch(`/employees/reset_password`, apiHelpers.postOptions(employee))
  .then(apiHelpers.handleResponse);
}

function requestWith(params) {
  var queryParams = jQuery.param(params);
 return fetch(`/employees/with?` + queryParams, apiHelpers.getOptions())
  .then(apiHelpers.handleResponse);
}

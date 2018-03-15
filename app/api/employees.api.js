import { apiHelpers } from '../helpers'

export const employeesAPI = {
  requestAll,
  requestAllWithManagers,
  requestEmployees,
  requestEmployee,
  disableEmployee,
  enableEmployee,
  updatePassword,
  requestWith
};

function requestAll() {
  return fetch(`/employees/all`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function disableEmployee(employee_id, manager_id) {
  return fetch(`/employees/disable_employee`, apiHelpers.postOptions({employee_id: employee_id, manager_id: manager_id}))
  .then(res => apiHelpers.handleResponse(res));
}

function enableEmployee(employee_id) {
  return fetch(`/employees/enable_employee`, apiHelpers.postOptions({employee_id: employee_id}))
  .then(res => apiHelpers.handleResponse(res));
}

function requestAllWithManagers() {
  return fetch(`/employees/all_with_managers`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestAll() {
  return fetch(`/employees/all`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}


function requestEmployees(manager_id) {
  return fetch(`/employees/with?manager_id=` + manager_id, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestEmployee(employee_id) {
  return fetch(`/employees/with_employee?employee_id=` + employee_id, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function updatePassword(employee) {
  return fetch(`/employees/update_password`, apiHelpers.postOptions(employee))
  .then(res => apiHelpers.handleResponse(res));
}

function requestWith(params) {
  var queryParams = jQuery.param(params);
 return fetch(`/employees/with?` + queryParams, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

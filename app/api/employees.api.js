import { apiHelpers } from '../helpers'

export const employeesAPI = {
  requestAll,
  requestEmployees
};

function requestAll() {
  return fetch(`/employees/all`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestEmployees(manager_id) {
  return fetch(`/employees/with?manager_id=` + manager_id, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

import { apiHelpers } from '../helpers'

export const policiesAPI = {
  requestAll,
  requestCompanies,
  requestExpenseTypes,
  updateValue
};

function requestAll() {
  return fetch(`/policies/all`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestCompanies() {
  return fetch(`/policies/companies`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function requestExpenseTypes() {
  return fetch(`/policies/expense_types`, apiHelpers.getOptions())
  .then(res => apiHelpers.handleResponse(res));
}

function updateValue(name, value) {
  return fetch(`/policies/update`, apiHelpers.postOptions({name: name, value: value}))
  .then(res => apiHelpers.handleResponse(res));
}
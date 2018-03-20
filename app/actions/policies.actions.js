import { policiesConstants } from '../constants';
import { policiesAPI } from '../api';

export const policiesActions = {
  requestAll,
  requestCompanies,
  requestExpenseTypes,
  updateValue
}

function requestAll() {
  return dispatch => {
    dispatch(request());
    return policiesAPI.requestAll().then(
      res => {
        return dispatch(success(res.policies))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: policiesConstants.REQUEST_POLICIES }}
  function success(policies) { return { type: policiesConstants.RECEIVE_POLICIES, policies }}
  function failure(error) { return { type: policiesConstants.FAILURE_POLICIES, error }}
}

function requestCompanies() {
  return dispatch => {
    dispatch(request());
    return policiesAPI.requestCompanies().then(
      res => {
        return dispatch(success(res.companies))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: policiesConstants.REQUEST_COMPANIES }}
  function success(companies) { return { type: policiesConstants.RECEIVE_COMPANIES, companies }}
  function failure(error) { return { type: policiesConstants.FAILURE_COMPANIES, error }}
}

function requestExpenseTypes() {
  return dispatch => {
    dispatch(request());
    return policiesAPI.requestExpenseTypes().then(
      res => {
        return dispatch(success(res.expense_types))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: policiesConstants.REQUEST_EXPENSE_TYPES }}
  function success(expense_types) { return { type: policiesConstants.RECEIVE_EXPENSE_TYPES, expense_types }}
  function failure(error) { return { type: policiesConstants.FAILURE_EXPENSE_TYPES, error }}
}

function updateValue(name, value) {
  return dispatch => {
    dispatch(request(name, value));
    return policiesAPI.updateValue(name, value).then(
      res => {
        return dispatch(success(name, value))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  }
  
  function request(name, value) { return { type: policiesConstants.UPDATE_POLICIES_REQUEST, name, value }}
  function success(name, value) { return { type: policiesConstants.UPDATE_POLICIES_SUCCESS, name, value }}
  function failure(error) { return { type: policiesConstants.UPDATE_POLICIES_FAILURE, error }}
}
import { policiesConstants } from '../constants';
import { policiesAPI } from '../api';

export const policiesActions = {
  requestAll,
  updateValue
}

function requestAll() {
  return dispatch => {
    dispatch(request());
    return policiesAPI.requestAll().then(
      res => dispatch(success(res.policies)),
      error => dispatch(failure(error))
    );
  };
  
  function request() { return { type: policiesConstants.REQUEST_POLICIES }}
  function success(policies) { return { type: policiesConstants.RECEIVE_POLICIES, policies }}
  function failure(error) { return { type: policiesConstants.FAILURE_POLICIES, error }}
}

function updateValue(name, value) {
  return dispatch => {
    dispatch(request());
    return policiesAPI.updateValue(name, value).then(
      res => dispatch(success(name, value)),
      error => dispatch(failure(error))
      )
  }
  
  function request() { return { type: policiesConstants.REQUEST_UPDATE_POLICIES }}
  function success(name, value) { return { type: policiesConstants.SUCCESS_UPDATE_POLICIES, name, value }}
  function failure(error) { return { type: policiesConstants.FAILURE_UPDATE_POLICIES, error }}
}
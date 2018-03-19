import {emailConstants} from "../constants";
import {emailAPI} from "../api";

export const emailActions = {
  requestEmail,
};

function requestEmail(claimee_id, approver_id) {
  return dispatch => {
    dispatch(request());
    return emailAPI.requestEmail(claimee_id, approver_id).then(
      res => dispatch(success(res.claimee_email, res.approver_email)),
      error => dispatch(failure(error))
    )
  };
  function request() { return { type: emailConstants.REQUEST_EMAIL }}
  function success(claimee_email, approver_email) { return { type: emailConstants.RECEIVE_EMAIL, claimee_email, approver_email }}
  function failure(error) { return { type: emailConstants.FAILURE_EMAIL, error }}
}
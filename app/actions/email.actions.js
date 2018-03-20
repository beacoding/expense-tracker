import { emailConstants } from "../constants";
import { emailAPI } from "../api";

export const emailActions = {
  sendClaimantEmail,
  sendApproverEmail
};

function sendClaimantEmail(claim, action) {
  return dispatch => {
    dispatch(request());
    return emailAPI.sendClaimantEmail(claim, action).then(
      res => {
        return dispatch(success(claim, action))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  };
  function request() { return { type: emailConstants.SEND_EMAIL_REQUEST }}
  function success(claim, action) { return { type: emailConstants.SEND_EMAIL_SUCCESS, claim, action }}
  function failure(error) { return { type: emailConstants.SEND_EMAIL_FAILURE, error }}
}

function sendApproverEmail(claim, approver_id, action) {
  return dispatch => {
    dispatch(request());
    return emailAPI.sendApproverEmail(claim, approver_id, action).then(
      res => {
        return dispatch(success(claim, approver_id, action))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  };
  function request() { return { type: emailConstants.SEND_EMAIL_REQUEST }}
  function success(claim, approver_id, action) { return { type: emailConstants.SEND_EMAIL_SUCCESS, claim, approver_id, action }}
  function failure(error) { return { type: emailConstants.SEND_EMAIL_FAILURE, error }}
}
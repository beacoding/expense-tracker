import { apiHelpers } from '../helpers'

export const emailAPI = {
  sendClaimantEmail,
  sendApproverEmail
};

function sendClaimantEmail(claim, action) {
  return fetch(`/email/send_claimant_email`, apiHelpers.postOptions({
    claim: claim,
    action: action
  }))
  .then(res => apiHelpers.handleResponse(res));
}

function sendApproverEmail(claim, new_approver_id, action) {
  return fetch(`/email/send_approver_email`, apiHelpers.postOptions({
    claim: claim,
    new_approver_id: new_approver_id,
    action: action
  }))
  .then(res => apiHelpers.handleResponse(res));
}

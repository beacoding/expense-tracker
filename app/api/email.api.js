import { apiHelpers } from '../helpers'

export const emailAPI = {
  sendClaimeeCreatedEmail,
  sendClaimeeSubmittedEmail,
  sendClaimeeForwardedEmail,
  sendClaimeeApprovedEmail,
  sendClaimeeDeclinedEmail,
  sendNewApproverEmail,
  sendApproverEmail,
  requestEmail
};

function sendClaimeeCreatedEmail(claimee_email, approver_email) {
  return fetch(`/email/sendClaimeeCreatedEmail`, apiHelpers.postOptions({
    claimee_email: claimee_email,
    approver_email: approver_email,
  }))
    .then(res => apiHelpers.handleResponse(res));
}

function sendClaimeeSubmittedEmail(claimee_email, approver_email) {
  return fetch(`/email/sendClaimeeSubmittedEmail`, apiHelpers.postOptions({
    claimee_email: claimee_email,
    approver_email: approver_email,
  }))
    .then(res => apiHelpers.handleResponse(res));
}

function sendClaimeeForwardedEmail(claimee_email, approver_email) {
  return fetch(`/email/sendClaimeeForwardedEmail`, apiHelpers.postOptions({
    claimee_email: claimee_email,
    approver_email: approver_email,
  }))
    .then(res => apiHelpers.handleResponse(res));
}

function sendClaimeeApprovedEmail(claimee_email, approver_email) {
  return fetch(`/email/sendClaimeeApprovedEmail`, apiHelpers.postOptions({
    claimee_email: claimee_email,
    approver_email: approver_email,
  }))
    .then(res => apiHelpers.handleResponse(res));
}

function sendClaimeeDeclinedEmail(claimee_email, approver_email) {
  return fetch(`/email/sendClaimeeDeclinedEmail`, apiHelpers.postOptions({
    claimee_email: claimee_email,
    approver_email: approver_email,
  }))
    .then(res => apiHelpers.handleResponse(res));
}

function sendNewApproverEmail(claimee_email, approver_email) {
  return fetch(`/email/sendNewApproverEmail`, apiHelpers.postOptions({
    claimee_email: claimee_email,
    approver_email: approver_email,
  }))
    .then(res => apiHelpers.handleResponse(res));
}

function sendApproverEmail(claimee_email, approver_email) {
  return fetch(`/email/sendApproverEmail`, apiHelpers.postOptions({
    claimee_email: claimee_email,
    approver_email: approver_email,
  }))
    .then(res => apiHelpers.handleResponse(res));
}


function requestEmail (claimee_id, approver_id){
  return fetch('/email/requestEmail', apiHelpers.postOptions({
    claimee_id: claimee_id,
    approver_id: approver_id
  }))
    .then(res => apiHelpers.handleResponse(res));
}
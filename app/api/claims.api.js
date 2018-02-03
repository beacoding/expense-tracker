import axios from 'axios';
import helpers from './helpers.api'

export const claimsAPI = {
    addClaim,
    removeClaim,
    requestAll,
};

function addClaim() {
  //TODO: send a claim over to the server and dispatch
}

function removeClaim() {
  //TODO: remove a claim over to the server and dispatch
}

function requestAll() {
 return fetch('/claims', helpers.getOptions)
  .then(res => helpers.handleResponse(res));
}

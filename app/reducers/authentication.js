import { authConstants } from '../constants';

let employeeUnparsed = localStorage.getItem('user')
const initialState = employeeUnparsed ? { loggedIn: true, employee: JSON.parse(employeeUnparsed) } : {};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGOUT:
    default:
      return state;
  }
}

export default authentication;
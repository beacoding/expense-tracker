import { authConstants } from '../constants';
import { authAPI } from '../api'

export const authActions = {
  logout
};

function logout() {
  authAPI.logout();
  return { type: authConstants.LOGOUT };
}
import { apiHelpers } from '../helpers'

export const authAPI = {
  logout
};

function logout() {
  localStorage.removeItem('user');
  window.location = "/logout"
}

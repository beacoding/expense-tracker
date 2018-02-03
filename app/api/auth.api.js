import axios from 'axios';

export const authAPI = {
    logout
};

function logout() {
  localStorage.removeItem('user');
  window.location = "/logout"
}

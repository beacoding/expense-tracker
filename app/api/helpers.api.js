
function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}

const getOptions = {
  method: 'GET',
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
  }
}

const helpers = {
  handleResponse,
  getOptions
};


export default helpers; 
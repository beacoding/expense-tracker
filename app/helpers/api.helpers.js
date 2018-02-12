export const apiHelpers = {
  handleResponse,
  getOptions,
  postOptions
};

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }
    return response.json();
}

function getOptions() {
  return {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  }
}

function postOptions(data) {
  return {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }
}

export default apiHelpers; 
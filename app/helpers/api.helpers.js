export const apiHelpers = {
  handleResponse,
  getOptions,
  postOptions,
  postFormOptions
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
}

function postFormOptions(data) {
  var form_data = new FormData();

  for (var key in data) {
    form_data.append(key, data[key]);
  }

  return {
    method: 'POST',
    credentials: 'include',
    body: form_data
  }
}

export default apiHelpers; 
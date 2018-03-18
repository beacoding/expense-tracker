export const apiHelpers = {
  handleResponse,
  getOptions,
  postOptions,
  postFormOptions
};

function handleResponse(response) {
  let promise = new Promise ((resolve, reject) => {
    console.log("in here", response)
      resolve(response.json());
  })

  return promise.then((obj) => {
    if (obj.error !== undefined ) {
      return Promise.reject(obj);
    } else {
      return  Promise.resolve(obj);
    }
  });
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

  for(var pair of form_data.entries()) {
     console.log(pair[0]+ ', '+ pair[1]); 
  }

  return {
    method: 'POST',
    credentials: 'include',
    body: form_data
  }
}

export default apiHelpers; 
export const userServices = {
  login,
  createUser,
};


function login(data) {
  const requestOptions =  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  return fetch(`/api/login/`, requestOptions).then(handleResponse);
}

function createUser(data) {
  const requestOptions =  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  return fetch(`/api/user/create/`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
  return response.text().then(text => {
    let data = text ;
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    data = text && JSON.parse(text);
    return data;
  });
}
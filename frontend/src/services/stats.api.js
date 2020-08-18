export const statsServices = {
  getStats
};

function getStats() {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/api/stats/?format=json`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    let data = text;
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    data = text && JSON.parse(text);
    return data;
  });
}
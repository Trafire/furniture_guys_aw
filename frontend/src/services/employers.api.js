export const employersServices = {
  publishPosting,
  getPostings,
  activateListing,
  deactivateListing
};


function publishPosting(data) {
  const requestOptions = {
    headers: {'Content-Type': 'application/json',},
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data),
  };
  return fetch(`/api/posting/`, requestOptions).then(handleResponse);
}

function getPostings() {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/api/postings/?format=json`, requestOptions).then(handleResponse);
}

function activateListing(id) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/api/posting/activate/true/${id}/`, requestOptions).then(handleResponse);
}

function deactivateListing(id) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/api/posting/activate/false/${id}/`, requestOptions).then(handleResponse);
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
export const candidatesServices = {
  getPostings,
  createCandidate,
  addApplication,
};


function addApplication(data) {
  console.log(data);
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/api/applications/create/${data['candidate']}/${data['posting']}/`, requestOptions).then(handleResponse);

}

function getPostings(page) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/api/postings/?format=json&page=${page}&active=true`, requestOptions).then(handleResponse);
}

function createCandidate(data) {
  console.log(data);
  const requestOptions = {
    headers: {'Content-Type': 'application/json',},
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data),
  };
  return fetch(`/api/candidate/create/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
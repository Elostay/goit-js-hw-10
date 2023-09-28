import axios from 'axios';
// const axios = require('axios');
axios.defaults.headers.common['x-api-key'] =
  'live_xXWfGjjh5kdmp4FOKDDsng4d36o9qo3Ph5ahzlaFQF8GBdRxcjUEdSApEhZr1yE7';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';

const fetchBreeds = function () {
  return fetch(`${BASE_URL}${ENDPOINT}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

const fetchCatByBreed = function (breedId) {
  return axios.get(
    `${BASE_URL}images/search?breed_ids=${breedId}&has_breeds=1`
  );
};

export { fetchBreeds, fetchCatByBreed };

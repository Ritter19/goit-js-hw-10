const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_bVZb6uqwkBnPJrCCnZ0imVKmRpLaW9PLubcdZZgtWCcpMpWu66kSFlTjcJlLXA0e';

// Fetch all cat breeds for dropdown list
export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, {
    headers: { 'x-api-key': API_KEY },
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

// Get specific cat by breed ID
export function fetchCatByBreeds(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

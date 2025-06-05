import { fetchBreeds, fetchCatByBreeds } from './cat-api';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

//choosing breed test
function chooseBreed() {
  loaderEl.classList.remove('is-hidden');
  fetchBreeds()
    .then(data => {
      const optionsMarkup = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join('');
      loaderEl.classList.add('is-hidden');
      errorEl.classList.add('is-hidden');

      breedSelectEl.insertAdjacentHTML('beforeend', optionsMarkup);
      breedSelectEl.classList.remove('is-hidden');
    })
    .catch(err => {
      loaderEl.classList.add('is-hidden');
      errorEl.classList.remove('is-hidden');
    })
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    });
}

chooseBreed();

breedSelectEl.addEventListener('change', e => {
  loaderEl.classList.remove('is-hidden');
  catInfoEl.classList.add('is-hidden');

  const breedId = e.target.value;

  fetchCatByBreeds(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoEl.innerHTML = `
        <img src="${url}" alt="${name}" width="400"/>
        <div>
          <h2>${name}</h2>
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
        </div>
      `;
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(err => {
      console.error(err);
      errorEl.classList.remove('is-hidden');
    })
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    });
});

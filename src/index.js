import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', onClickSelect);

catInfo.style.marginTop = '30px';

loader.classList.add('hide');
error.classList.add('hide');

fetchBreeds()
  .then(response => {
    return response
      .map(
        obj =>
          `<option class="js-option" value="${obj.id}">${obj.name}</option>`
      )
      .join('');
  })
  .then(response => select.insertAdjacentHTML('beforeend', response))
  .catch(err => console.log(err));

function onClickSelect(e) {
  const breedId = e.target.value;

  select.classList.add('hide');
  loader.classList.remove('hide');
  catInfo.classList.add('hide');

  fetchCatByBreed(breedId)
    .then(resp => {
      select.classList.remove('hide');
      const data = resp.data[0].breeds[0];
      return `<img src="${resp.data[0].url}" alt="" width="500">
		<h2>${data.name}</h2>
		<p>${data.description}</p>
    	<p><b>Tempetament:</b> ${data.temperament}</p>`;
    })
    .then(resp => {
      loader.classList.add('hide');
      catInfo.classList.remove('hide');
      return (catInfo.innerHTML = resp);
    })
    .catch(err => {
      select.classList.remove('hide');
      loader.classList.add('hide');
      // error.classList.remove('hide');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

import './css/styles.css';
import Notiflix from 'notiflix';



var _ = require('lodash');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  _.debounce(e => {
    e.preventDefault();

    const inputValue = inputEl.value.trim();
    if (!inputValue) {
      countryInfoEl.innerHTML = '';
      countryListEl.innerHTML = '';
      return;
    } else {
      fetchCountries(inputValue)
        .then(data => {
          console.log(data);
          if (data.length === 1) {
            renderCountry(data);
          } else if (data.length < 10 && data.length > 1) {
            renderListCountry(data);
          } else {
            countryInfoEl.innerHTML = '';
            countryListEl.innerHTML = '';
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
          }
        })
        .catch(error => {
          countryInfoEl.innerHTML = '';
          countryListEl.innerHTML = '';
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
  }, DEBOUNCE_DELAY),
);



function renderListCountry(countries) {
  countryInfoEl.innerHTML = '';
  const markup = countries
    .map(
      ({ flags, name }) => `
            <li> <img width="25" height="25" src=${flags.svg}></img> ${name.official}</li>
            `,
    )
    .join('');
  countryListEl.innerHTML = markup;
}



function renderCountry([{ name, capital, population, flags, languages }]) {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = `
         <div> <ul>
  <li> Official Name : ${Object.values(name)[1]}</li>
  <li> Capital : ${capital}</li>
  <li> Population :  ${population}</li>
  <li> Flag <img width="30" height="25" src=${Object.values(flags)[1]}></img></li>
  <li> Languages : ${Object.values(languages)}</li>
  </ul> </div>
  `;
  }
  function fetchCountries(name) {
    return fetch(
      `https:restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      return response.json();
    });
  }
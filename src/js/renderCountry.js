export function renderCountry([{ name, capital, population, flags, languages }]) {
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
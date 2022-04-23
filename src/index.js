import './css/styles.css';
var _ = require('lodash');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
console.log(inputEl)
console.log(inputEl.value)

inputEl.addEventListener("input", _.debounce((e) => {
    e.preventDefault()
    console.log(inputEl.value);}, DEBOUNCE_DELAY));

   
   
//     const result = _.add(2, 3);
// console.log(result);


// document.addEventListener(
//     "scroll",
//     _.debounce(() => {
//       console.log("Scroll handler call after 300ms pause");
//     }, 300)
//   );
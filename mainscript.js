/* 
GLOBAL VARIABLES***********************

*/

//main variables
const countriesWrapper = document.querySelector(".countries-wrapper");

const subtitle = document.querySelector(".subtitle");

const searchInput = document.querySelector(".search");
// all buttons variables
let buttons = document.querySelectorAll(".buttons");

let sortbyName = document.querySelector(".SortByName");
let SortDesc = document.querySelector(".SortDesc");
let sort = document.querySelectorAll(".Sort");
let sortbyCapital = document.querySelector(".SortbyCapital");
let sortbyPopulation = document.querySelector(".SortbyPopulation");
/*
 */
//TOP 10 stuff variable
let populationDiv = document.querySelector(".top-ten-population");
let subtitleForStats = document.querySelector(".subtitle-for-stats");
let languagesDiv = document.querySelector(".top-ten-languages");

console.log(buttons); // ok!
console.log(sort); //ok!

//  copies from the countriesObject so that we don't change the original
const copyCountries = [...countries];
const copyCountriesTwo = [...countries];
const copyCountriesThree = [...countries];

/*


      FUNCTIONS********************


*/
// function 1. that shows the content (countries info in the page)
const showCountriesContent = array => {
  countryDivInnerHtml = "";
  countriesWrapper.innerHTML = "";

  array.forEach((country, i) => {
    countryDivInnerHtml += createCountryContent(country);
  });

  countriesWrapper.innerHTML = countryDivInnerHtml;
};
// function2.  that creates object/ content:
const createCountryContent = object => {
  const { name, capital, languages, population, flag } = object;
  return `<div class="country-div">
  <div class="flag-div"><img class="flag-img" src="${flag}" /></div>
  <p class="countryName-p"> ${name}</p>
  <p class="capital-p">  <span class="property-type">Capital: </span>${capital}</p>
  <p class="languages-p"><span class="property-type"> Languages:</span> ${languages.join(
    ", "
  )}</p>
  <p class="population-p"> <span class="property-type">Population: </span>${population.toLocaleString()}</p>
</div>`;
};

//function 3. filtering the countries

const filterCountries = (array, search) => {
  const filteredCountries = array.filter(country => {
    let { name, capital, languages } = country;

    let isName = name.toLowerCase().includes(search);
    let isCapital = capital.toLowerCase().includes(search);
    let isLanguages = languages
      .join(", ")
      .toLowerCase()
      .includes(search);

    return isName || isCapital || isLanguages;
  });

  /* ako je input prazan vrati cijelu listu ako nije prazan vrati filtrirano*/

  let result = search == "" ? array : filteredCountries;
  subtitle.textContent = `Currently, we have ${
    filteredCountries.length
  } countries`;
  /**/

  return result;
};

/*

SORTING PART!!!!!! 

The sort() method sorts the elements of an array in place and returns the array!
arr.sort([compareFunction]) a,b su parametri koje kompariramo

*/

/* 1. array in reversed alphabetic order by NAME original (in alphabetic order) so just reverse it!
 The slice() method returns the selected elements in an array, as a new array object.*/
const reversedArray = countries.slice().reverse();

//2. array in alph. order by CAPITALS (use copy of array not to change original)

const capitalArray = copyCountries.sort(function(a, b) {
  let x = a.capital.toLowerCase();
  let y = b.capital.toLowerCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0; // nema promjene mjesta
});

// 3. array in descending(veci->manji) order with POPULATION, use copy of array

const populationArray = copyCountriesTwo.sort(function(a, b) {
  let x = a.population;
  let y = b.population;
  return y - x;
});

/*
SOMETHING is not working in this part if that is ON(meaning not commented out ) nothing works!

         BUTTONS********************!!!!!-event listener  138-162 line!!!
         
   I tryed ->      window.onload = function() {}; DOES NOT HELP!

*/

/*
  `buttons` is an Array, so you can not directly call `addEventListener` on it.
  You have to go over each item in the array and call `addEventListener` on each one.
*/
buttons.forEach(button => {
    button.addEventListener("click", e => {
        let searchTerm = e.target.value.toLowerCase();

        if (e.target.className === "Sort") {
            function buttonFunction() {
                let sort = document.querySelectorAll(".Sort");

                if (sort.className === "SortDesc") {
                    showCountries(filterCountries(reversedArray, searchTerm));

                    sort.className = "SortByName";
                } else if (sort.className === "SortByName") {
                    sort.className = "SortDesc";

                    showCountries(filterCountries(countries, searchTerm));
                }
            }

            buttonFunction();
        } else if (e.target.className === "SortByCapital") {
            showCountries(filterCountries(capitalArray, searchTerm));
        } else {
            showCountries(filterCountries(populationArray, searchTerm));
        }
    });
});

/*

INPUT FIELD********************

this works fine if button part is commented out!
*/

searchInput.addEventListener("input", e => {
  countriesWrapper.innerHTML = "";
  let searchTerm = e.target.value.toLowerCase();
  showCountriesContent(filterCountries(countries, searchTerm));

  /****kalkulacija za subtitle*****/
  let newCountries = filterCountries(countries, searchTerm);
  subtitle.textContent = `Found ${newCountries.length} countries.`;
});

/* 

EXECUTION********************

*/

subtitle.textContent = `Currently, we have ${countries.length} countries`;
showCountriesContent(countries);

/*

 STATISTICS TEN MOST POPULATED COUNTRIES AND TEN MOST LANGUAGES

*/

//1. TEN MOST POPULATED COUNTRIES

const tenMostPopulated = populationArray.slice(0, 10);

// Population of the world
let count = 0;
countries.forEach(country => {
  count = count + country.population;
});
const worldPopulation = count;

// top10 populated -create content

const createPopulationContent = content => {
  const { name, population } = content;
  let width = (population / worldPopulation) * 100;
  return `
  <div class="container">
  <p class="toptenNames">${name}</p>
<div class="population-bar" style="width: ${width}%">${population}</div>
  </div>`;
};

// top10 populated show content
const showCountriesPopulation = array => {
  let content = "";
  array.forEach((country, i) => {
    content += createPopulationContent(country);
  });
  populationDiv.innerHTML = content;
};

showCountriesPopulation(tenMostPopulated);
subtitleForStats.textContent = "Ten most populated countries";

//2. Top 10 Languages.... coming soon

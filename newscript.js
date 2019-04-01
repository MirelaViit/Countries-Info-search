// all buttons variables
let buttons = document.querySelectorAll(".buttons");
let sort = document.querySelectorAll(".Sort");

const countriesWrapper = document.querySelector(".countries-wrapper");
const subtitle = document.querySelector(".subtitle");
const searchInput = document.querySelector(".search");

//  copies from the countriesObject so that we don't change the original
const copyCountries = [...countries];
const copyCountriesTwo = [...countries];
const copyCountriesThree = [...countries];

//TOP 10 stuff variable
let populationDiv = document.querySelector(".top-ten-population");
let subtitleForStats = document.querySelector(".subtitle-for-stats");
let languagesDiv = document.querySelector(".top-ten-languages");

const filter = {
  searchText: "",
  sortMode: "name",
  sortDirection: "asc"
};

const filterCountries = () => {
  return countries
    .filter(country => {
      const searchName = country.name.toLowerCase().includes(filter.searchText);
      const searchCapital = country.capital
        .toLowerCase()
        .includes(filter.searchText);
      const searchLanguages = country.languages.find(language =>
        language.toLowerCase().includes(filter.searchText)
      );
      return searchName || searchCapital || searchLanguages;
    })
    .sort((a, b) => {
      const left = a[filter.sortMode];
      const right = b[filter.sortMode];
      if (left > right) {
        return filter.sortDirection === "asc" ? 1 : -1;
      } else if (left < right) {
        return filter.sortDirection === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });
};
/**show the countries */
const showContent = () => {
  const filteredCountries = filterCountries();
  countriesWrapper.innerHTML = "";
  filteredCountries.forEach(country => {
    const { name, languages, population, capital, flag } = country;
    const countryDiv = document.createElement("div");
    countryDiv.className = "country-div";
    countryDiv.innerHTML = `
   
    <div class="flag-div"><img class="flag-img" src="${flag}" /></div>
    <p class="countryName-p"> ${name}</p>
    <p class="capital-p">  <span class="property-type">Capital: </span>${capital}</p>
    <p class="languages-p"><span class="property-type"> Languages:</span> ${languages.join(
      ", "
    )}</p>
    <p class="population-p"> <span class="property-type">Population: </span>${population.toLocaleString()}</p>
  </div>`;

    countriesWrapper.appendChild(countryDiv);
  });
};

showContent();

searchInput.addEventListener("input", e => {
  filter.searchText = e.target.value.toLowerCase();
  showContent();

  /****kalkulacija za subtitle*****/
  let newCountries = filterCountries();
  subtitle.textContent = `Found ${newCountries.length} countries.`;
});

buttons.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    e.target.classList.add("active");
    if (e.target.classList.contains("SortByName")) {
      filter.sortMode = "name";
    } else if (e.target.classList.contains("capital")) {
      filter.sortMode = "capital";
    } else if (e.target.classList.contains("population")) {
      filter.sortMode = "population";
    }
    showContent();
  });
});

sort.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();

    if (e.target.classList.contains("SortAsc")) {
      filter.sortDirection = "asc";
    } else if (e.target.classList.contains("SortDesc")) {
      filter.sortDirection = "desc";
    }
    showContent();
  });
});

//1. TEN MOST POPULATED COUNTRIES

// 3. array in descending(veci->manji) order with POPULATION, use copy of array

const populationArray = copyCountriesTwo.sort(function(a, b) {
  let x = a.population;
  let y = b.population;
  return y - x;
});

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

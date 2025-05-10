const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
let allCountries = [];

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;
    displayCountries(allCountries); 
  })
  .catch((error) => {
    console.error("Error fetching countries:", error);
  });

function displayCountries(countries) {
  const countriesContainer = document.querySelector(".cards-container");
  countriesContainer.innerHTML = ""; 
  countries.forEach((country) => {
    const card = createCountryCard(country); 
    countriesContainer.appendChild(card);
  });
}

function searchCountries() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  displayCountries(filteredCountries); 
}

searchButton.addEventListener("click", searchCountries);
searchInput.addEventListener("input", searchCountries); 

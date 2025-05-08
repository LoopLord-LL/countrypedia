const apiCountries = "https://restcountries.com/v3.1/all";
const countriesContainer = document.querySelector(".cards-container");
const modal = document.getElementById("countryModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.querySelector(".close");

function createCountryCard(country) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="country-flag">
      <img src="${country.flags.png}" alt="${country.name.common} flag" class="flag" />
    </div>
    <div class="info">
      <h3 class="country-name">${country.name.common}</h3>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    showModal(country);
  });

  return card;
}

function showModal(country) {
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((cur) => `${cur.name} (${cur.symbol})`)
        .join(", ")
    : "N/A";
  const timezones = country.timezones ? country.timezones.join(", ") : "N/A";

  modalDetails.innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Official Name:</strong> ${country.name.official}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>Currencies:</strong> ${currencies}</p>
    <p><strong>Timezones:</strong> ${timezones}</p>
    <img src="${country.flags.png}" alt="${
    country.name.common
  } flag" style="width: 100%; margin-top: 10px;" />
  `;

  modal.style.display = "block";
}

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

fetch(apiCountries)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      const card = createCountryCard(country);
      countriesContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching countries:", error);
  });

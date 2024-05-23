import { CountryServices } from "./countryServices.mjs";

const resultsContainer = document.querySelector("#results-container");
const countryServices = new CountryServices("co", resultsContainer);

countryServices.init();
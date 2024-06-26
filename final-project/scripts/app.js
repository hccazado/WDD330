import { displayAlert } from "./alert.mjs";
import { CountryServices } from "./countryServices.mjs";
import { displayFavorites } from "./favorites.mjs";
import { Show } from "./show.mjs";

const resultsContainer = document.querySelector("#results-container");
const countrySelect = document.querySelector("#countries");
const searchOptions = document.querySelector("#search-options");
const btnSearch = document.querySelector("#btn-search");
const searchContainer = document.querySelector(".search");
const btnFavorites = document.querySelector("#btn-favorites");
const btnHome = document.querySelector("#btn-home");

searchOptions.addEventListener("change", optionSelection);

btnSearch.addEventListener("click", handleSearch);

btnFavorites.addEventListener("click", handleFavoritesBtn);

btnHome.addEventListener("click", handleHomeBtn);

function optionSelection(event){
    const option = event.target.value;
    const divImdb = document.querySelector(".search-imdb");
    const divTitle = document.querySelector(".search-title");
    if (option == "title"){
        divTitle.classList.remove("hide");
        divImdb.classList.add("hide");
        document.querySelector("#title").required = true;
        document.querySelector("#countries").required = true;
        document.querySelector("#btn-search").removeAttribute("disabled");
    }
    if (option == "imdbId"){
        divImdb.classList.remove("hide");
        divTitle.classList.add("hide");
        document.querySelector("#imdb").required = true;
        document.querySelector("#btn-search").removeAttribute("disabled");
    }

    if (option == "streamings"){
        if(!divImdb.classList.contains("hide")){
            divImdb.classList.add("hide");
        }
        if(!divTitle.classList.contains("hide")){
            divTitle.classList.add("hide");
        }
        countrySelect.required = true;
        countrySelect.addEventListener("change", (e)=>{
            document.querySelector("#btn-search").removeAttribute("disabled");
        })
    }
}

function handleSearch(){
    const option = searchOptions.value;
    const country = countrySelect.value;
    const imdb = document.querySelector("#imdb").value;
    const title = document.querySelector("#title").value;

    if (option == "streamings"){
        if(country == "all"){
            displayAlert("A country must be selected!");
        }
        else{
            const countryServices = new CountryServices(country, resultsContainer);
            countryServices.init();
        }
    }
    else if(option == "imdbId"){
        
        if(imdb == ""){
            displayAlert("A ImdbId must be informed!");
        }
        else{
            resultsContainer.innerHTML = "";
            const shows = new Show(imdb, title, "show", country, option, resultsContainer);
            shows.init();  
        }
    }
    else if(option == "title"){
        
        if (title == "" || country == "all"){
            displayAlert("A title must be informed and a country choose!");
        }
        else{
            resultsContainer.innerHTML = "";
            const shows = new Show(imdb, title, "show", country, option, resultsContainer);
            shows.init();  
        }
    }
}

function handleFavoritesBtn(e){
    searchContainer.style.display = "none";
    displayFavorites(resultsContainer);
}

function handleHomeBtn(e){
    searchContainer.style.display = "block";
    resultsContainer.innerHTML = "";
}

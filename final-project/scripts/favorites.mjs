import { setStorage, getStorage } from "./storage.mjs";
import { getShowById } from "./DAOServices.mjs";
import { getGenres } from "./show.mjs";
import { displayAlert } from "./alert.mjs";

const resultContainer = document.querySelector("#results-container");

export async function addToFavorites(imdb){
    const favorite = await favoriteData(imdb);
    const favoritesList = getFavorites();
    if(favoritesList.length == 0){
        favoritesList.push(favorite);
    }else{
        let exist = false;
        favoritesList.forEach(item =>{
            if(item.imdbId == favorite.imdbId){
                exist = true;
            }
        });
        if(exist){
            displayAlert ("Already a favorite!");
        }
        else{
            favoritesList.push(favorite);
            displayAlert ("Added to your favorites!");
        }
    }
    setStorage("favorites", favoritesList);
    
}

export function getFavorites(){
    return getStorage("favorites");
}

async function favoriteData(imdbId){
    const show = await getShowById(imdbId);
    const favoriteData = {
        imdbId: show.imdbId,
        title: show.originalTitle,
        genres: getGenres(show.genres),
        poster: show.imageSet.verticalPoster.w360,
        checked: false
    }
    return favoriteData;
}

export function displayFavorites(container){
    const favList = getStorage("favorites");
    container.innerHTML = "";
    if(favList.length == 0){
        container.innerHTML = "Sorry, you don't have any show here"
    }
    favList.forEach(favorite =>{
        container.insertAdjacentHTML("beforeend",template(favorite));
    });
    setHandleDeleteFavorite();
    setHandleCheckFavorite();
}

export function getImdbIdSubstring(substring){
    let values = String(substring).split("-");
    return values[1];
}

function setHandleDeleteFavorite(){
    const favorites = document.querySelectorAll(".favorite-card");
    favorites.forEach(favorite =>{
        favorite.lastElementChild.previousElementSibling.addEventListener("click", deleteFavorite);
    });
}

function setHandleCheckFavorite(){
    const favorites = document.querySelectorAll(".favorite-card");
    favorites.forEach(favorite =>{
        favorite.lastElementChild.addEventListener("click", checkFavorite);
    });
}

function deleteFavorite(e){
    const id = getImdbIdSubstring(e.target.id);
    const favoriteList = getFavorites();
    const newFavorites = favoriteList.filter(favorite=>favorite.imdbId != id);
    displayAlert ("Removed from your favorites!");
    setStorage("favorites", newFavorites);
    displayFavorites(resultContainer);
}

function checkFavorite(e){
    const id = getImdbIdSubstring(e.target.id);
    const favoriteList = getFavorites();
    favoriteList.forEach(favorite =>{
        if (favorite.imdbId == id){
            favorite.checked ? favorite.checked = false : favorite.checked = true;
        }
    });
    displayAlert ("Changed status from your favorite show!");
    setStorage("favorites", favoriteList);
    displayFavorites(resultContainer);
}

function getChecked(checked){
    if(checked){
        return "checked";
    }
}

const template = (show) =>{
    return `<div class="favorite-card">
            <img src="${show.poster}" alt="poster from ${show.title}">
            <h3>${show.title}</h3>
            <p>IMDB: ${show.imdbId}</p>
            <p>Genres: ${show.genres}</p>
            <div id="remove-${show.imdbId}" class="btn-remove"></div>
            <div id="check-${show.imdbId}" class="btn-check ${getChecked(show.checked)}"></div
        </div>`;
}

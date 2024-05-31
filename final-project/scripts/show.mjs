import { getShowById, getShowsByTitle } from "./DAOServices.mjs";
import { addToFavorites, getImdbIdSubstring } from "./favorites.mjs";
import { getStorage } from "./storage.mjs";
import { displayInfo } from "./showDetail.mjs";

export class Show{
    constructor(id = null, title = null, type = "show", country, searchOption, container){
        this.id = id;
        this.title = title;
        this.type = type;
        this.country = country;
        this.container = container;
        this.searchOption = searchOption;
    }

    async init(){
        if(this.searchOption == "imdbId"){
            this.list = await getShowById(this.id); 
            this.renderShows();
        }
        else{
            this.list = await getShowsByTitle(this.country, this.title);
            this.renderShows();
        }
    }

    renderShows(){
        this.container.innerHTML = "";
        if(this.searchOption == "imdbId"){
            this.container.insertAdjacentHTML("afterbegin", template(this.list));
        }
        else{
            this.list.forEach(show =>{
                this.container.insertAdjacentHTML("afterbegin", template(show));
            })
        }
        setFavoriteEventListener();
        setDisplayInfoListener();
    }
}

export function getGenres(genres){
    let genresString = "";
    genres.forEach(genre=>{
        genresString += genre.name + "; ";
    });
    return genresString;
}

function handleAddFavorite(e){
    const imdbId = e.target.id;
    addToFavorites(imdbId);
    e.target.classList.add("isFavorite");
}

function checkFavorite(imdbId){
    const favoritesList = getStorage("favorites");
    let isFavorite = false;
    favoritesList.forEach(favorite=>{
        if(favorite.imdbId == imdbId){
            isFavorite = true;
        }
    });
    if(isFavorite){
        return "isFavorite";
    }
    else{
        return "";
    }
}

function setFavoriteEventListener(){
    const showsList = document.querySelectorAll(".show-card");
    showsList.forEach(show =>{
        show.lastElementChild.addEventListener("click", handleAddFavorite);
    });
}

function setDisplayInfoListener(){
    const showsList = document.querySelectorAll(".show-card");
    showsList.forEach(show =>{
        show.lastElementChild.previousElementSibling.addEventListener("click", handleDisplayInfo);
    });
}

function handleDisplayInfo(e){
    const id = getImdbIdSubstring(e.target.id);
    displayInfo(id);
}

const template = (show) =>{
    return `<div class="show-card">
            <img src="${show.imageSet.verticalPoster.w360}" alt="poster from ${show.originalTitle}">
            <h3>${show.originalTitle}</h3>
            <p>IMDB: ${show.imdbId}</p>
            <p>Genres: ${getGenres(show.genres)}</p>
            <div id="sh-${show.imdbId}" class="btn-info"></div>
            <div id="${show.imdbId}" class="btn-favorite ${checkFavorite(show.imdbId)}">Favorite: </div>
        </div>`;
}
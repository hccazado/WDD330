import { getShowById, getShowsByTitle } from "./DAOServices.mjs";
import { addToFavorites } from "./favorites.mjs";

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
            console.log("show by id: "+this.id);
            this.shows = await getShowById(this.id); 
            this.renderShows();
        }
        else{
            console.log("show by title: "+this.title);
            this.shows = await getShowsByTitle(this.country, this.title);
            this.renderShows();
        }
    }
    renderShows(){
        this.container.innerHTML = "";
        if(this.searchOption == "imdbId"){
            this.container.insertAdjacentHTML("afterbegin", template(this.shows));
        }
        else{
            this.shows.forEach(show =>{
                this.container.insertAdjacentHTML("afterbegin", template(show));
            })
        }
        setFavoriteEventListener();
    }
}

export function getGenres(genres){
    let text = "";
    genres.forEach(genre=>{
        text += genre.name + "; ";
    });
    return text;
}

function handleAddFavorite(e){
    const imdbId = e.target.id;
    addToFavorites(imdbId);
}

function setFavoriteEventListener(){
    const showsList = document.querySelectorAll(".show-card");
    showsList.forEach(show =>{
        show.lastElementChild.addEventListener("click", handleAddFavorite);
    });
}

const template = (show) =>{
    return `<div class="show-card">
            <img src="${show.imageSet.verticalPoster.w360}" alt="poster from ${show.originalTitle}">
            <h3>${show.originalTitle}</h3>
            <p>IMDB: ${show.imdbId}</p>
            <p>Genres: ${getGenres(show.genres)}</p>
            <div id="${show.imdbId}" class="btn-favorite"></div>
        </div>`;
}
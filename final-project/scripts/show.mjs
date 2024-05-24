import { getShowById, getShowsByTitle } from "./DAOServices.mjs";

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
    }
}

const template = (show) =>{
    return `<div class="show-card">
            <img src="${show.imageSet.verticalPoster.w360}" alt="poster from ${show.originalTitle}">
            <h3>${show.originalTitle}</h3>
            <p>IMDB: ${show.imdbId}</p>
        </div>`;
}
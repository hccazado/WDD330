import { getShowById } from "./DAOServices.mjs";

export class Show{
    constructor(id = null, title = null, type = "show", container){
        this.id = id;
        this.title = title;
        this.type = type;
        this.container = container;
    }

    async init(){
        this.shows = await getShowById(this.type, this.id);
    }

    renderShows(){

    }
}

const template = (show) =>{
    return `<div class="card">
            <img src="${show.imageSet.verticalPoster.w360}" alt="poster from ${show.originalTitle}">
            <h3>${show.originalTitle}</h3>
        </div>`;
}
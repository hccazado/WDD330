import { setStorage, getStorage } from "./storage.mjs";
import { getShowById } from "./DAOServices.mjs";
import { getGenres } from "./show.mjs";

export async function addToFavorites(imdb){
    const favorite = await favoriteData(imdb);
    const favoritesList = getFavorites();
    console.log(favoritesList);
    if(favoritesList.length == 0){
        favoritesList.push(favorite);
    }else{
        let exist = false;
        favoritesList.forEach(item =>{
            if(item.imdb == favorite.imdb){
                exist = true;
            }
        });
        if(exist == false){
            favoritesList.push(favorite);
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
        imdb: show.imdbId,
        title: show.originalTitle,
        genres: getGenres(show.genres),
        poster: show.imageSet.verticalPoster.w360,
        checked: false
    }
    return favoriteData;
}

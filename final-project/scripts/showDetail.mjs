import { getShowById } from "./DAOServices.mjs";

const infoContainer = document.querySelector("#show-info");
const searchContainer = document.querySelector("#results-container");

export async function displayInfo(imdbId){
    const show = await getShowById(imdbId);

    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = "❌";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "1rem";
    closeBtn.style.right = "1rem";
    closeBtn.style.cursor = "pointer";

    closeBtn.addEventListener("click", e=>{
        infoContainer.style.display = "none";
        searchContainer.style.display = "flex";
    });
    searchContainer.style.display="none";
    
    infoContainer.innerHTML = "";
    infoContainer.innerHTML = template(show);
    infoContainer.appendChild(closeBtn);
    infoContainer.style.display = "block";
}

function getLanguages(streamings){
    const selectedCountry = document.querySelector("#countries").value.toLowerCase();
    let languages = [];
    if (selectedCountry == "all"){
        return "A country must be selected";
    }
    else{
        if (streamings[selectedCountry] != null || streamings[selectedCountry] != undefined){
            streamings[selectedCountry].forEach(streaming=>{
                if(streaming.type == "addon" || streaming.type == "subscription"){
                    streaming.audios.forEach(language=>{
                        if(languages.indexOf(language.language) == -1){
                            languages.push(language.language);
                        }
                    });
                };
            });
            let languagesString = languages.toString().split(",").join("; ");
            return languagesString;
        }
        else{
            return "Languages not available.";
        }
    }  
}

function getLinks(streamings){
    const selectedCountry = document.querySelector("#countries").value.toLowerCase();
    let liLinks = "";
    if (selectedCountry == "all"){
        return "A country must be selected";
    }
    else{
        if(streamings[selectedCountry] == null || streamings[selectedCountry] == undefined){
            return "Streamings not available."
        }
        else{
            streamings[selectedCountry].forEach(streaming=>{
                if(streaming.type == "addon" || streaming.type == "subscription"){
                    liLinks += `<a href="${streaming.link}" target="_blank">${streaming.service.name}</a>; `;
                }
            });
            return liLinks; 
            }
        }

}

function template(show){
    return `
        <h3>${show.originalTitle}</h3>
        <img src="${show.imageSet.verticalPoster.w480}" alt="poster from ${show.originalTitle}">
        <p><strong>Overview: </strong>${show.overview}</p>
        <P><strong>Languages: </strong>${getLanguages(show.streamingOptions)}</p>
        <p><strong>Links: </strong>${getLinks(show.streamingOptions)}</p>
    `;

}
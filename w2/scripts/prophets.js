const src = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const template = document.querySelector("#prophet-card");
let container = document.querySelector("#prophetsContainer");

async function loadData(){
    try{
        const result = await fetch(src);

        if (result.ok){
            
            const data = await result.json();
            displayProphets(data.prophets);
        }
        else{
            throw Error (await result.text());
        }
    }catch(error){
        console.log(error);
    }
}

function displayProphets(prophets){
    prophets.forEach(prophet => {
        container.appendChild(createCard(prophet));
        

    });
    
}

function createCard(prophet){
    const card = template.content.cloneNode(true);
    const name = card.querySelector("#h2");
    const birthPlace = card.querySelector("#birthPlace");
    const dob = card.querySelector("#dob");
    const img = card.querySelector("#img");

    name.innerText = `${prophet.name} ${prophet.lastname}`
    img.src = prophet.imageurl;
    dob.innerText = prophet.birthdate;
    birthPlace.innerText = prophet.birthplace;

    return card;
}

loadData();
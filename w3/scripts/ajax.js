const url = 'https://pokeapi.co/api/v2/pokemon';

const output = document.getElementById("output");

async function getPokemon(url){
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        doStuff(data);
    }
}

function doStuff(data){
    data.results.forEach((pokemon)=>{
        let div = document.createElement("div");
        div.textContent = pokemon.name;
        output.appendChild(div);
    });
}

getPokemon(url);

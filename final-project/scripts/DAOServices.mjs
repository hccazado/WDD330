//'https://streaming-availability.p.rapidapi.com/shows/%7Bid%7D?series_granularity=episode&output_language=en';
const api = 'https://streaming-availability.p.rapidapi.com/';

const options = {
    method: "GET",
    headers:{
        'x-rapidapi-key': '595e5fb78dmshc9c8c80ab3c6dc0p1ad4e8jsn7540730f3fc6',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
}

export async function getCountryServices(country){
    const query = `countries/${country}`;
    const services = await fetchData(query);
    return services.services;
}

async function fetchData(params){
    try{
        const response = await fetch(`${api}${params}?output_language=en`, options);
        if (response.ok){
            const result = await response.json();
            return result;
        }
        else{
            console.log(`Something Went wrong. ${await response.body()}`);
            return {};
        }
    }
    catch(error){
        new Error(`Something Went wrong. ${error}`);
    }       
}

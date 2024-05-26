const streamingAvailability = window.streamingAvailability;

const api = 'https://streaming-availability.p.rapidapi.com/';

/*const options = {
    method: "GET",
    headers:{
        'x-rapidapi-key': '595e5fb78dmshc9c8c80ab3c6dc0p1ad4e8jsn7540730f3fc6',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
}*/
const options ={
    key: '595e5fb78dmshc9c8c80ab3c6dc0p1ad4e8jsn7540730f3fc6'
}

const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
    apiKey: '595e5fb78dmshc9c8c80ab3c6dc0p1ad4e8jsn7540730f3fc6'
}));

export async function getShowsByTitle(country, title){
    const results = await client.showsApi.searchShowsByTitle({
        "title": title,
        "country": country
    });
    return results;
}

export async function getCountryServices(country){
    const results = await client.countriesApi.getCountry({
        countryCode: country
    })
    return results.services;
}

export async function getShowById(id){
    const results = await client.showsApi.getShow({
        "id": id
    });
    return results;
}

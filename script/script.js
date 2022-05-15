
const covidByCountry = {
    'others': {
        'names': [],
        'data': []
    },
    Americas: {
        'names': [],
        'data': []
    },
    Europe: {
        'names': [],
        'data': []
    },
    Africa:{
        'names': [],
        'data': []
    },
    Asia: {
        'names': [],
        'data': []
    },
    Oceania: {
        'names': [],
        'data': []
    }
};


export async function orderCoutries(url) {
    const continents = {};

    const allCountryData = await fetch(url);
    const allCounties = await allCountryData.json()
    for (let country of allCounties) {
        const name = country.name.common;
        const regionName = country.region;
        if (regionName === '')
            continents[name] = 'others';
        else {
            continents[name] = regionName;
        }

    }
    return continents;
}


export async function getCovidByCountry() {

    const countriesByRegion = await orderCoutries(`https://restcountries.herokuapp.com/api/v1`)
    const covid_19_Data = await fetch(` https://corona-api.com/countries`);
    const covid19Parsed = await covid_19_Data.json();
    for (let country of covid19Parsed.data) {

        const countryName = country.name;
        const continent = countriesByRegion[countryName]
        if (continent === undefined) {
            continue;
        }

        const covidDataCountry = country['latest_data'];
        covidByCountry[continent]['names'].push(countryName);
        covidByCountry[continent]['data'].push(covidDataCountry)
 
   
    }

    return covidByCountry;
}


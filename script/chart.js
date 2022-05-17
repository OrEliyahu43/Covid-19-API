import { countrisAndContinent, orderCoutries, getCovidByCountry } from './script.js'

let myChart = null;
const paramType = ['deaths', 'confirmed', 'recovered', 'critical']
const paramButtons = document.querySelectorAll('.param_btn')
const continentButtons = document.querySelectorAll('.continent_btn')
let currentContinenet = 'Europe'
let currentParameter = 'confirmed'
let covidData = {};

async function createTable(coviddata, currentContinenet, currentParameter) {

    const countries = covidData[currentContinenet].names;
    console.log(countries);
    const paramData = [];
    for (let country of covidData[currentContinenet].data) {
        paramData.push(country[currentParameter]);
        console.log(country)
    }

    console.log(paramData);

    const data = {
        categoryPercentage: 20,
        labels: countries,
        datasets: [{
            label: currentParameter,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: paramData,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };


    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );


}

async function createCountryTable(country) {
    myChart.destroy();

    const covidData = await fetch(`https://intense-mesa-62220.herokuapp.com/corona-api.com/countries`);
    const parsedData = await covidData.json();
    console.log(parsedData);
    let countryData;
    for (let countryObject of parsedData.data) {
        if (countryObject.name === country) {
            countryData = countryObject['latest_data'];
        }
    }

     const {deaths , critical , confirmed , recovered} = countryData;
     const releventData = [];
     releventData.push(deaths)
     releventData.push(critical)
     releventData.push(confirmed)
     releventData.push(recovered)

     const parameters = ['deaths','critical','confirmed','recovered']
    const data = {
        categoryPercentage: 20,
        labels: parameters,
        datasets: [{
            label: country,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: releventData,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {}
    };


    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}


const selectList = document.querySelector('#countr-select')

async function selectCountryData() {

    for (let key in countrisAndContinent) {
        let option = document.createElement("option");
        option.value = key;
        option.text = key;
        selectList.appendChild(option);
    }
    selectList.addEventListener('change', () => {createCountryTable(selectList.value)})
}


async function initPage() {

    covidData = await getCovidByCountry();
    await createTable(covidData, currentContinenet, currentParameter);
    await selectCountryData();
    paramButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            myChart.destroy();
            currentParameter = btn.innerText;
            createTable(covidData, currentContinenet, currentParameter);
        })
    })

    continentButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            myChart.destroy();
            currentContinenet = btn.innerText;
            createTable(covidData, currentContinenet, currentParameter);

        })

    })
}

initPage().catch(
    () => {
        console.log('error')
    }
)






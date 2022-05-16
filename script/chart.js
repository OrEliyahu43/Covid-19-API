import { orderCoutries, getCovidByCountry } from './script.js'

let myChart = null;
const paramType = ['deaths', 'confirmed', 'recovered', 'critical']
const paramButtons = document.querySelectorAll('.param_btn')
const continentButtons = document.querySelectorAll('.continent_btn')
let currentContinenet = 'Europe'
let currentParameter = 'confirmed'
let covidData= {} ;

async function createTable(coviddata,currentContinenet, currentParameter) {

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


async function initPage(){

    covidData = await getCovidByCountry();
    await createTable(covidData, currentContinenet, currentParameter);

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
    ()=>{
        console.log('error')
    }
)






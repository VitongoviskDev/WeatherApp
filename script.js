const weatherApiKey = 'b3cb7a8073b752ab489692f04606ded3';
const apikey = 'ede788eb8d85621a2dc67a302398cea0'
const prokey = 'afff12742b145cecf3d45ceec8206fd6';
const historykey = 'http://history.openweathermap.org/data/2.5/history/city?id=2885679&type=hour&appid=afff12742b145cecf3d45ceec8206fd6'

const weatherIconImg = document.getElementById('current-icon');
const cityP = document.getElementById('city');
const temperatureP = document.getElementById('current-temperature');
const descriptionP = document.getElementById('current-description');
const minP = document.getElementById('current-min');
const maxP = document.getElementById('current-max');
const windIconImg = document.getElementById('wind-icon');
const compassImg = document.getElementById('wind-compass');
const compassArrowImg = document.getElementById('wind-compass-arrow');
const windSpeedP = document.getElementById('wind-speed');
const windDegP = document.getElementById('wind-deg');
const allCardInfo = document.querySelectorAll(".info-card");
console.log(allCardInfo);

const KelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

const searchBar = document.querySelector('.search-bar');
const input = searchBar.querySelector('input');

function search(){
    if(ValidateInput()){
        console.log('click', input.value)
        getCurrentWeather(input.value)
    }

    input.value = '';
}
function ValidateInput(){
    if(input.value.trim() == ''){
        searchBar.classList.add('wrong');
        return false;
    }
    return true;
}
function onInputChanged() {
    searchBar.classList.remove('wrong');
}

async function getCurrentWeather(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&appid=${apikey}`,{mode: 'cors'})
    let data = await response.json();

    console.log(data);
    if(data.cod != 404){
        FillData(data);
    }else{
        alert(data.message);
    }
    
}

function FillData(data){
    weatherIconImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    cityP.textContent = data.name;
    temperatureP.textContent = KelvinToCelsius(data.main.temp) + '°';
    descriptionP.textContent = data.weather[0].description;
    minP.textContent = KelvinToCelsius(data.main.temp_min) + '°';
    maxP.textContent = KelvinToCelsius(data.main.temp_max) + '°';
    compassArrowImg.classList.add('rotated');
    compassArrowImg.style.transform = `rotate(${data.wind.deg + 360}deg)`;
    windSpeedP.textContent = Math.round(data.wind.speed * 3.6);
    windDegP.textContent = data.wind.deg + '°';

    let sunrise = new Date(data.sys.sunrise * 1000);
    const sunriseP = allCardInfo[0].querySelector('.sunrise');
    sunriseP.textContent = `${sunrise.getHours()}:${sunrise.getMinutes()}`

    let sunset = new Date(data.sys.sunset * 1000);
    const sunsetP = allCardInfo[0].querySelector('.sunset');
    sunsetP.textContent = `${sunset.getHours()}:${sunset.getMinutes()}`


    const fellsLikeP = allCardInfo[1].querySelector('.content #feels-like');
    fellsLikeP.textContent = KelvinToCelsius(data.main.feels_like) + '°';

    const humidityP = allCardInfo[2].querySelector('.content #humidity');
    humidityP.textContent = data.main.humidity + "%";

    const pressureP = allCardInfo[3].querySelector('.content #pressure');
    pressureP.textContent = data.main.pressure;

    const cloudsP = allCardInfo[4].querySelector('.content #clouds');
    cloudsP.textContent = data.clouds.all;

    const visibilityP = allCardInfo[5].querySelector('.content #visibility');
    visibilityP.textContent = (data.visibility / 1000).toFixed(2);

    const rainP = allCardInfo[6].querySelector('.content #rain');
    rainP.textContent = Math.round(data.rain != undefined ? data.rain['1h'] : '0');

    
    const currentDate = new Date(data.dt * 1000);
    if(currentDate.getHours() > 18 || currentDate.getHours() < 6){
        document.documentElement.classList.add('night');
        windIconImg.src = './assets/Icons/wind-light.png'
        compassImg.src = './assets/compass/compass-light.png';
        compassArrowImg.src = './assets/compass/arrow-light.png';
    }else{
        document.documentElement.classList.remove('night');
        compassImg.src = './assets/compass/compass-dark.png';
        compassArrowImg.src = './assets/compass/arrow-dark.png';
    }
}


getCurrentWeather('Mogi das Cruzes');
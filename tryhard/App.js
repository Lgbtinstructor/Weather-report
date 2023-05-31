import conditions from './conditions.js';


console.log(conditions);

const apiKey = `d748d3eac9e94f338c283654233005`;
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const header = document.querySelector('.header');

function removeCard(){
     const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage){
    const html = `<div class='card'>${errorMessage}</div>`
    header.insertAdjacentHTML('afterend', html)
}

function showCard({name,country,temp,condition, imgPath}){

    const html = `   <div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>
    <div class="card-weather">
    <div class="card-value">${temp}<sup>°C</sup></div>
    <img class="card-img" src="${imgPath}" alt="png">
    </div>
    <div class="card-desc">${condition}</div>
    </div>`
    
    header.insertAdjacentHTML('afterend', html)
   }
   async function getWeather(city){
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url)
    const data = await response.json();
    console.log(data);
    return data;
}



form.onsubmit = async function(e){
    e.preventDefault();
    
    let city = input.value.trim();
    const data = await getWeather(city);
  

    if (data.error){
        removeCard();
        showError (data.error.message);
    } 
    else {  
   removeCard();

    console.log(data.current.condition.code);
        const magma = conditions.find(
            (obj) => obj.code === data.current.condition.code
            );
       console.log(magma);
       console.log(magma.languages[23]['day_text']);
        
       const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/';
       const fileName = (data.current.is_day ? magma.day : magma.night) + '.png';
       const imgPath = filePath + fileName;
       console.log('filnName', filePath + fileName)
     

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.is_day 
            ? magma.languages[23]['day_text'] 
            : magma.languages[23]['night_text'],
            imgPath: imgPath
        };

   showCard(weatherData);
    }  


}

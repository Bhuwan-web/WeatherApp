const form=document.querySelector("form");
const details=document.querySelector(".details");
const time=document.querySelector("img.time");
const icon=document.querySelector('#icon');


const updateCity=async(city)=>{
    const cityDetails =await getLocationKey(city);
    const weather=await getWeather(cityDetails.Key);
    return {cityDetails ,weather};
}


form.addEventListener('submit',event=>{
    
    //prevent default actions
    event.preventDefault();
    time.scrollIntoView();


    //get city name from search
    const searchValue= form.city.value.trim();
    form.reset();
    
    //updating UI

    updateCity(searchValue)
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));
    localStorage.setItem('city',searchValue);

});
    const updateUI=(data)=>
    {
            //Structuring properties
        // const cityDetails=data.cityDetails;
        // const weather=data.weather;

            // insetd use destructuring properties
        const {cityDetails,weather}=data;
        details.innerHTML=
        `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        `
        if(details.parentElement.classList.contains("d-none")){
            details.parentElement.classList.remove("d-none");
        }

        // update image as of weather
        const iconSrc=`../icons/${weather.WeatherIcon}.svg`
        icon.setAttribute("src",iconSrc);
    

         //Update image as if it's day or night..
    
    
            //ternary operator method
        const timeSrc = (weather.IsDayTime)?"../day.svg":"../night.svg";
        time.setAttribute('src',timeSrc);
    
            //If else method

        //const timeSrc=null;
        // if(weather.IsDayTime){
        //     timeSrc="../day.svg"
        //     time.setAttribute("src",timeSrc)
        // }
        // else{
        //     timeSrc="../night.svg"
        //     time.setAttribute("src",timeSrc)
        // }
    }  

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data=>updateUI(data))
    .catch(err=>console.log(err));;
}
const apiKey="e2d6DarbfrQBF2icLJjjLi0Nv9CSePK5";

//Get the location key of the assigned location
const getLocationKey= async (city)=>{
    const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query=`?apikey=${apiKey}&q=${city}`;
    const resource=await fetch(baseUrl+query);
    const data=await resource.json();
    return data[0];
}






// get the wether info

const getWeather=async(cityKey)=>{
    const baseUrl=`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`
    const query=`?apikey=${apiKey}`;
    const response=await fetch(baseUrl+query);
    const data=await response.json();
    return data[0];
}


// fecthning asyncronomyously 

//it will run when we update search data in placeholder through app.js


// getLocationKey("Kathmandu")
// .then(data=>{
//     return getWeather(data.Key)
// }).then(data=>console.log(data))
// .catch(err=>console.log(err));
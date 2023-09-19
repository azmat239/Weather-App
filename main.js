var info_text=document.querySelector('#info-text');
var wrapper =document.querySelector('.wraper') 
var Input=document.querySelector('#Input1');
var inputValue = document.querySelector('#cityinput');
var searchbutton = document.querySelector('#add');
var Getlocationbutton = document.querySelector('#add1');
var WIicon = document.querySelector('img');
var hidden = document.querySelector('#hide');
var hidden1 = document.querySelector('#hide2');
let apiK = 'your api key';
var api

WIicon.style.display='none';
hidden.style.display='none';
hidden1.style.display='none';
searchbutton.addEventListener('click',e=>{
    if(inputValue.value != ''){
        requestapi(inputValue.value);
    }
    else{
        alert('Please Provide The City ');
    }
})

Getlocationbutton.addEventListener('click', () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});
function requestapi(city){
    api = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid='+apiK;
    console.log(inputValue.value)
    fetchData();
}
function onSuccess(position){
    var {latitude,longitude} = position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiK}`;
    fetchData()
}

function onError(){
    info_text.innerText='Something is Wrong ';
    info_text.classList.add('error')
}


function fetchData(){
    info_text.innerText='Getting The Weather...';
    info_text.classList.add('pending');
    fetch(api)
    .then(response=>response.json())
    .then(result => WeatherResult(result))
    .catch((e)=>{
        console.log(e);
        info_text.innerText='Something Wrong here';
        info_text.classList.replace('pending','error');
});
}

function WeatherResult(info){
        
    if(info.cod=='404'){
        info_text.innerText = `${Input.value} isn't a valid city name`;
        info_text.classList.replace('pending','error');

    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {temp,feels_like,humidity} = info.main;
        const windspd = info.wind.speed;


        if(id==800){
            WIicon.src='./icons/clear.svg';
        }
        else if(id == 200 && id==232){
            WIicon.src='icons/storm.svg';
        }
        else if(id == 600 && id==622){
            WIicon.src='icons/snow.svg';
        }
        else if(id >= 801 && id<=804){
            WIicon.src='icons/cloud.svg';
        }
        else if(id == 700 && id==781){
            WIicon.src='icons/haze.svg';
        }
        else if((id == 500 && id==531) || (id == 300 && id==321)){
            WIicon.src='icons/rain.svg';
        }
        
        
        WIicon.style.display='block';
        hidden.style.display='block';
        hidden1.style.display='block';



        wrapper.querySelector('#cityoutput').innerText=city+','+country;
        wrapper.querySelector('#description').innerText = description;
        wrapper.querySelector('#temp').innerText = ` ${Math.floor(temp>70?temp-273.15:temp)} `;
        wrapper.querySelector('#humidity').innerText = humidity + '%';
        wrapper.querySelector('#feelsLike').innerText = Math.floor(temp>70?temp-273.15:temp);
        wrapper.querySelector('#wind').innerText = windspd + '%';


        info_text.innerText='';
        info_text.classList.remove('pending','error');
        inputValue.value=''
        wrapper.classList.add('active');
        

    }

}


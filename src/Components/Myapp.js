import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import cloud from "../images/Clouds.png"
import clear from "../images/Clear.png"
import rain from "../images/Rain.png"
import errors from "../images/Error.png"
import mist from "../images/mist.png"
import haze from "../images/Haze.png"
import snow from "../images/Snow.png"
import smoke from "../images/Smoke.png"

const Myapp = () => {

    const[search, setSearch] =useState("");
    const[data, setData]= useState();
    const[error,setError]= useState();
    const API_KEY ="c716a1c551d3bf1b2fc476b98c7987d2";

    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

    const handleInput=(event)=>{
        setSearch(event.target.value);
        console.log(event.target.value);
    }

    const myFun=async()=>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
        const jsonData = await get.json();
        console.log(jsonData);
        setData(jsonData);

        if(search == ""){
           //alert("Please Enter city") ;
           setError("Please enter name ")
        }else if(jsonData.cod == 404){
          setError("Please enter valid name")
        }else{
          setError("")
        }
        setSearch("")

    }

  return (
    <>
      <div className="container">
        <div className="inputs">
            <input type="text" placeholder='Enter City / Country Name' value={search} onChange={handleInput}/>
            <button onClick={myFun}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
        {
          error ? 
          <div className='errorPage'>
          <p>{error}</p>
          <img src={errors}/>
          </div> : ""
        }

        <div>
        {
          data && data.weather ?
          <div className='weathers'>
            <h1 className='cityName'>{data.name}</h1><br/>
            <img src={data.weather[0].main=="Clouds" ? cloud : ""} />
            <img src={data.weather[0].main=="Rain" ? rain : ""} />
            <img src={data.weather[0].main=="Clear" ? clear : ""} />
            <img src={data.weather[0].main=="Mist" ? mist : ""} />
            <img src={data.weather[0].main=="Haze" ? haze : ""} />
            <img src={data.weather[0].main=="Snow" ? snow : ""} />
            <img src={data.weather[0].main=="Smoke" ? smoke : ""} />
            <br/>
            <h2 className='temperature'>Temperature :{Math.trunc(data.main.temp)} °C</h2>
            <h2>Humidity : {data.main.humidity}%</h2>
            <h2 className='climate'>Description : {data.weather[0].description}</h2>
          </div> : ""
        }
        </div>
      </div>
      <div className='footer'>
      <h3>Created by @ Viraj Ghadigaonkar </h3>
      </div>
    </>
  )
}

export default Myapp

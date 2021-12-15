import React, { useState } from "react";

const api = {
  key: "39352e3977e9fefaf2c350f6c11353d2",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);

  const dateBuilder = (d)=>{
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  
  }

  const search = (evt) => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(r => {
        setWeather(r);
        setQuery('');
      })
    }
  }

  return (
    <div className={(typeof weather.main !="undefined") ? ((
      (weather.main.temp > 16) ? ('App warm'):('App')
    )):('App')}>
        <main>
          <div className="search-box">
            <input 
            type={"text"} 
            className="search" 
            placeholder="Search... "
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={evt => search(evt)}
            />
          </div>

          {(typeof weather.main !== "undefined") ? (<>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box"> 
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          </>):('')}
          
        </main>
    </div>
  );
}

export default App;

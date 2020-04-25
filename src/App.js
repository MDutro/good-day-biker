import React, {useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Today from './Today';
import './App.css';
import SearchBar from './SearchBar';
import { useGPS } from './UseGPS';

const App = () => {
  const [weather, setWeather] = useState(null)
  const gps = useGPS()
 
  useEffect(() => {
    if (gps) {
    axios.get('http://localhost:3001', {
      params: {
        q: gps
      }
    })
    .then(response => response.data)
    .then(data => setWeather(data))
    .catch(err => console.log(err))
    } 
  }, [gps])
  


  const onCitySubmit = useCallback(city => {
    axios
      .get('http://localhost:3001/search', {
        params: {
          q: city
        }
      })
      .then(response => response.data)
      .then(data => {console.log(data); setWeather(data)})
      .catch(err => console.log(err));
  }, [])


  const GetWeather = () => {
    // If geolocation is off or fails give user search blank
    if (!weather) {
      if (!weather || !navigator.geolocation || !gps) {
        return <div className="container">
          <SearchBar 
            onSubmit={onCitySubmit}
          />
        </div>
      }
    }
    // If geolocation succeeds render results
    return <div className="container">
      {weather.data &&
        <Today 
          high={weather.data[0].high_temp}
          low={weather.data[0].low_temp}
          wind={weather.data[0].wind_spd}
          rain={weather.data[0].pop}
          date={weather.data[0].datetime}
          city={weather.city_name}
          state={weather.state_code}
        />
      }
    </div>
  }

  return (
    <div>
      <div className="titleBar">
        <h1>GoodDayBiker</h1>
      </div>
      <GetWeather />
    </div>
  );
}

export default App;

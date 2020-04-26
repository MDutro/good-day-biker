import React, {useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Today from './Today';
import NextWeek from './NextWeek';
import './App.css';
import SearchBar from './SearchBar';
import { useGPS } from './UseGPS';

const App = () => {
  const initialState = () => JSON.parse(window.localStorage.getItem('last-search-result')) || null
  const [weather, setWeather] = useState(initialState)
  // const [weather, setWeather] = useState(null)
  const gps = useGPS()
 
  // Make API call to server if gps coords are available
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

  // Write to local storage for data persistence when offline
  useEffect(() => {
    window.localStorage.setItem('last-search-result', JSON.stringify(weather))
  }, [weather])

  // Make API call to server when using search bar
  const onCitySubmit = useCallback(city => {
    axios
      .get('http://localhost:3001/search', {
        params: {
          q: city
        }
      })
      .then(response => response.data)
      .then(data => setWeather(data))
      .catch(err => console.log(err));
  }, [])

  const clearWeather = () => {
    setWeather(null)
  }

  const GetWeather = () => {
    // If geolocation is off or fails give user search blank
    if (!weather) {
      if (!weather || !navigator.geolocation) {
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
          date={weather.data[0].datetime.split("-")}
          city={weather.city_name}
          state={weather.state_code}
          clearWeather={clearWeather}
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
      {weather && <NextWeek weather={weather.data.slice(1,)} />}
    </div>
  );
}

export default App;

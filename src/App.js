import React, {useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Today from './Today';
import NextWeek from './NextWeek';
import SearchBar from './SearchBar';
import { useGPS } from './UseGPS';
import SettingsDrawer from './SettingsDrawer';
import './App.css';


const App = () => {
  // Check for state in local storage and set to weather. Otherwise, initial state is null.
  const initialState = () => JSON.parse(window.localStorage.getItem('last-search-result')) || null
  const [weather, setWeather] = useState(initialState)
  const [preferencesPanel, setPreferencesPanel] = useState(false)
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
    localStorage.setItem('last-search-result', JSON.stringify(weather))
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

  // Fnc to clear weather state and re-render SearchBar for new search
  const clearWeather = () => {
    setWeather(null)
  }

  const closePrefPanel = () => {
    setPreferencesPanel(false)
  }

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
    // If geolocation or manual search succeeds render results
    return <div>
      <div className="container">
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
      {weather && <NextWeek weather={weather.data.slice(1,)} />}
    </div>
  }

  return (
    <div>
      <div className="titleBar">
        <h1>GoodDayBiker</h1>
      </div>
      <SettingsDrawer 
        isOpen={preferencesPanel}
        close={closePrefPanel}  
      />
      <GetWeather />
      <button className="button" onClick={() => setPreferencesPanel(true)}>Settings</button>
    </div>
  );
}

export default App;

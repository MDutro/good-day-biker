import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Today } from "./Today";
import { NextWeek } from "./NextWeek";
import { SearchBar } from "./SearchBar";
import { useGPS } from "./utils/UseGPS";
import { SettingsDrawer } from "./SettingsDrawer";
import { RatingsDrawer } from "./RatingsDrawer";
import { PreferencesContext } from "./utils/PreferencesContext";
import { SERVER_BASE } from "./constants";
import { DEFAULT_SETTINGS } from "./constants";
import "./App.css";

const getLocalPreferences = () => {
  const pref = localStorage.getItem("user-preferences");
  try {
    return JSON.parse(pref) || DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

const App = () => {
  // Check for state in local storage and set to weather. Otherwise, initial state is null.
  const initialState = () =>
    JSON.parse(localStorage.getItem("last-search-result")) || null;
  const [weather, setWeather] = useState(initialState);
  // Toggles for preferences and ratings panels
  const [preferencesPanel, setPreferencesPanel] = useState(false);
  const [ratingsPanel, setRatingsPanel] =useState(false);

  const [preferences, setPreferences] = useState(getLocalPreferences);
  const gps = useGPS();

  // Make API call to server if gps coords are available
  useEffect(() => {
    if (gps) {
      axios
        .get(SERVER_BASE, {
          params: {
            q: gps,
          },
        })
        .then((response) => response.data)
        .then((data) => setWeather(data))
        .catch((err) => console.log(err));
    }
  }, [gps]);

  // Write to local storage for data persistence when offline
  useEffect(() => {
    localStorage.setItem("last-search-result", JSON.stringify(weather));
  }, [weather]);

  // Make API call to server when using search bar
  const onCitySubmit = useCallback((city) => {
    axios
      .get("http://localhost:3001/search", {
        params: {
          q: city,
        },
      })
      .then((response) => response.data)
      .then((data) => setWeather(data))
      .catch((err) => console.log(err));
  }, []);

  // Fnc to clear weather state and re-render SearchBar for new search
  const clearWeather = () => {
    setWeather(null);
  };

  const closePrefPanel = () => {
    setPreferencesPanel(false);
  };

  const closeRatePanel = () => {
    setRatingsPanel(false);
  }

  const GetWeather = () => {
    // If geolocation is off or fails give user search blank
    if (!weather) {
      if (!weather || !navigator.geolocation || !gps) {
        return (
          <div className="contentRoot">
            <div className="container">
              <SearchBar onSubmit={onCitySubmit} />
            </div>
          </div>
        ); 
      }
    }
    // If geolocation or manual search succeeds render results
    return (
      <div className="contentRoot">
        <div className="container">
          {weather.data && (
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
          )}
        </div>
        {weather && <NextWeek weather={weather.data.slice(1)} />}
      </div>
    );
  };

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      <div>
        <div className="titleBar">
          <h1>GoodDayBiker</h1>
        </div>
        <div className="bikeBackground"/>
        <SettingsDrawer isOpen={preferencesPanel} close={closePrefPanel} />
        {weather && <RatingsDrawer
          isOpen={ratingsPanel}
          close={closeRatePanel}
          high={weather.data[0].high_temp} 
          wind={weather.data[0].wind_spd}
          rain={weather.data[0].pop}
        /> }
        <GetWeather />
        <div className="buttonBar">
          <button className="button" onClick={() => setPreferencesPanel(true)}>
            Settings
          </button>
          <button className="button" onClick={() => setRatingsPanel(true)}>
            Rate Ride
          </button>
        </div>
      </div>
    </PreferencesContext.Provider>
  );
};

export default App;

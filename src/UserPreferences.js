import React from 'react';
import { PreferencesContext } from './PreferencesContext';
import './UserPreferences.css';

export const UserPreferences = (props) => {
  const { preferences, setPreferences } = React.useContext(PreferencesContext)

  const savePreferences = () => {
    localStorage.setItem("user-preferences", JSON.stringify(preferences));

    props.close()
  }

  const defaultSettings = () => {
    const defaultPreferences = {high: 65, rain: 25, wind: 10}
    localStorage.setItem("user-preferences", JSON.stringify(defaultPreferences))
    setPreferences(defaultPreferences)

    props.close()
  }

  return(
    <div className="panel">
      <h1>User Preferences</h1>
      <p>Minimum temperature: <strong>{preferences.high}</strong></p>
      <div className="sliderContainer">
        <input type="range" min="-40" max="110" value={preferences.high} className="slider" 
          onChange={e => setPreferences({...preferences, high: e.target.value})} />
      </div>
      <p>Maximum precipitaion chance: <strong>{preferences.rain}</strong></p>
      <div className="sliderContainer">
        <input type="range" min="0" max="100" value={preferences.rain} className="slider"
          onChange={e => setPreferences({...preferences, rain: e.target.value})} />
      </div>
      <p>Maximum wind speed: <strong>{preferences.wind}</strong></p>
      <div className="sliderContainer">
        <input type="range" min="0" max="50" value={preferences.wind} className="slider"
          onChange={e => setPreferences({...preferences, wind: e.target.value})} />
      </div>
      <button className="button" onClick={savePreferences}>Save</button>
      <img src="gears.png" style={{maxWidth: "175px", marginTop: "10px"}} alt="" />
      <button className="button" onClick={defaultSettings}>Reset</button>
    </div>
  )
}

import React, { useState } from 'react';
import './UserPreferences.css';

const UserPreferences = (props) => {
  const initialState = () => ({high: 65, rain: 25, wind: 10})  
  const [preferences, setPreferences] = useState(initialState)

  return(
    <div className="preferences">
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
      <button className="button" onClick={props.close}>Save</button>
    </div>
  )
}

export default UserPreferences;

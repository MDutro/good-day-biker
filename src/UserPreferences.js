import React from 'react';
import './UserPreferences.css';

const preferences = {
    high: 65,
    rain: 25,
    wind: 10
  } 

const UserPreferences = (props) => {
  // const initialState = () => ({high: 65, rain: 25, wind: 10})  
  // const [preferences, setPreferences] = useState(intitialState())

  const hidePrefs = () => {
    document.querySelector(".preferences").classList.add('close');
    setTimeout(props.toggleSettings(), 0)
  }

  return(
    <div className="preferences">
      <h1>User Preferences</h1>
      <p>Minimum temperature</p>
      <div className="sliderContainer">
        <input type="range" min="-40" max="110" defaultValue={preferences.high} className="slider" 
          onChange={e => preferences.high = e.target.value} />
      </div>
      <p>Maximum precipitaion chance</p>
      <div className="sliderContainer">
        <input type="range" min="0" max="100" defaultValue={preferences.rain} className="slider"
          onChange={e => preferences.rain = e.target.value} />
      </div>
      <p>Maximum wind speed</p>
      <div className="sliderContainer">
        <input type="range" min="0" max="50" defaultValue={preferences.wind} className="slider"
          onChange={e => preferences.wind = e.target.value} />
      </div>
      <button onClick={hidePrefs} className="button">Save</button>
    </div>
  )
}

export default UserPreferences;
export const savedPreferences = preferences;

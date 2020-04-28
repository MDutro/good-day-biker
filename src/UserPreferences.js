import React from 'react';

const preferences = {
    high: 65,
    rain: 25,
    wind: 10
  } 

const UserPreferences = (props) => {
  // const initialState = () => ({high: 65, rain: 25, wind: 10})  
  // const [preferences, setPreferences] = useState(intitialState())

  return(
    <div className="preferences">
      <h1>User Preferences</h1>
      <p>Minimum temperature</p>
      <div class="sliderContainer">
        <input type="range" min="-40" max="110" value={preferences.high} className="slider" 
          onChange={e => preferences.high = e.target.value} />
      </div>
      <p>Maximum precipitaion chance</p>
      <div class="sliderContainer">
        <input type="range" min="0" max="100" value={preferences.rain} className="slider"
          onChange={e => preferences.rain = e.target.value} />
      </div>
      <p>Maximum wind speed</p>
      <div class="sliderContainer">
        <input type="range" min="0" max="50" value={preferences.wind} className="slider"
          onChange={e => preferences.wind = e.target.value} />
      </div>
      <button onClick={props.toggleSettings} className="button">Save</button>
    </div>
  )
}

export default UserPreferences;
export const savedPreferences = preferences;

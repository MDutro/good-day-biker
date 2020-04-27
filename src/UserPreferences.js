import React from 'react';

const preferences = {
    high: 65,
    rain: 25,
    wind: 10
  } 

const UserPreferences = () => {
  // const initialState = () => ({high: 65, rain: 25, wind: 10})  
  // const [preferences, setPreferences] = useState(intitialState())
 

  return(
    <div>
      <h1>User Preferences</h1>
      <p>Minimum temperature</p>
      <div class="sliderContainer">
        <input type="range" min="-40" max="110" value="65" className="slider" 
          onChange={e => preferences.high = e.target.value} />
      </div>
      <p>Maximum precipitaion chance</p>
      <div class="sliderContainer">
        <input type="range" min="0" max="100" value="25" className="slider"
          onChange={e => preferences.rain = e.target.value} />
      </div>
      <p>Maximum wind speed</p>
      <div class="sliderContainer">
        <input type="range" min="0" max="50" value="10" className="slider"
          onChange={e => preferences.wind = e.target.value} />
      </div>
    </div>
  )
}

export default UserPreferences;
export const savedPreferences = preferences;

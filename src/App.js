import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Today from './Today';
import './App.css';

const App = () => {

  const [gps, setGps] = useState('')
  const [weather, setWeather] = useState({})
  
  useEffect(() => navigator.geolocation.getCurrentPosition(
    position => setGps(
      [position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2)]
  )) , [])

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
 
  if (gps) {
    console.log(weather)
  }
  
  return (
    <div>
      <div className="titleBar">
        <h1>GoodDayBiker</h1>
      </div>
      <div className="container">
        {weather.data && 
          <Today 
            // high={weather.data[0].high_temp}
            high={weather.data[0].high_temp}
            low={weather.data[0].low_temp}
            wind={weather.data[0].wind_spd}
            rain={weather.data[0].pop}
            date={weather.data[0].datetime}
          />
        }
        
      </div>
    </div>
  );
}

export default App;

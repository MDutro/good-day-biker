import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [gps, setGps] = useState('')
  const [weather, setWeather] = useState({})
  
  useEffect(() => navigator.geolocation.getCurrentPosition(
    position => setGps([position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2)])
    // position => setGps(`${position.coords.latitude.toFixed(2)},${position.coords.longitude.toFixed(2)}`)
   ) , [])

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
 console.log(weather)
  return (
    <div className="container">
      <h1>GoodDayBiker</h1>
    </div>
  );
}

export default App;

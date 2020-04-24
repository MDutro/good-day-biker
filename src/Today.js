import React from 'react';
import './Today.css';
import preferences from './preferences';


const Today = (props) => {

 const dayEvaluation = () => {
  if(props.high >= preferences.high && props.rain <= preferences.rain && props.wind <= preferences.wind) {
    return true
  }
    return false
  }

   

  return(
    <div>
    <div className="card">
      <p>{props.date}</p>
      <p>{`High: ${props.high}F`}</p>
      <p>{`Low: ${props.low}F`}</p>
      <p>{`Rain Chance: ${props.rain}%`}</p>
      <p>{`Wind: ${props.wind}mph`}</p>
    </div>
      <p>Today is {dayEvaluation() ? 'a' : 'not a'} good day for a ride.</p>
    </div>
    
  )
}

export default Today;
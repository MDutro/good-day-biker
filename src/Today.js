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

  const date = props.date.split("-")

  return(
    <div>
    <div className="card">
      <h2 className="cardTitle">Today: {date[1]}/{date[2]}</h2>
      <img src={dayEvaluation() ? "bike.png" : "noBike.png"} style={{maxWidth: "100px"}} alt="" />
      <div className="cardBody">
        <p className="topRow">{`High: ${props.high}F`}</p>
        <p className="topRow">{`Precip: ${props.rain}%`}</p>
        <p className="bottomRow">{`Low: ${props.low}F`}</p>
        <p className="bottomRow">{`Wind: ${props.wind}mph`}</p>
      </div>
    </div>
      
      <p>Today is {dayEvaluation() ? 'a' : 'not a'} good day for a ride.</p>
    </div>
    
  )
}

export default Today;
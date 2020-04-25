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
  console.log(props.city)
  return(
    <div>
    <div className="card">
      <h2 className="cardTitle">{props.city}, {props.state}</h2>
      <h3 className="date">{date[1]}/{date[2]}</h3>
      <img src={dayEvaluation() ? "bike.png" : "noBike.png"} style={{maxWidth: "100px"}} alt="" />
      <div className="cardBody">
        <p className="topRow">{`High: ${props.high}F`}</p>
        <p className="topRow">{`Precip: ${props.rain}%`}</p>
        <p className="bottomRow">{`Low: ${props.low}F`}</p>
        <p className="bottomRow">{`Wind: ${props.wind}mph`}</p>
      </div>
    </div>
      
      <p>{dayEvaluation() ? "It's a good day, let's go ride!" : 'Maybe not today...'}</p>
    </div>
    
  )
}

export default Today;
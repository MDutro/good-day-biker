import React from 'react';
import './Today.css';
import { useGoodDay } from '../utils/useGoodDay';


export const Today = (props) => {
  

  const goodDay = useGoodDay(props.high, props.rain, props.wind)

  return(
    <div>
    <div className="card">
      <h2 className="cardTitle">{props.city}, {props.state}</h2>
      <h3 className="date">{props.date[1]}/{props.date[2]}</h3>
      <img src={goodDay ? "bike.png" : "noBike.png"} style={{maxWidth: "100px"}} alt="" />
      <div className="cardBody">
        <p className="topRow">{`High: ${Math.floor(props.high)}F`}</p>
        <p className="topRow">{`Precip: ${Math.floor(props.rain)}%`}</p>
        <p className="bottomRow">{`Low: ${Math.floor(props.low)}F`}</p>
        <p className="bottomRow">{`Wind: ${Math.floor(props.wind)}mph`}</p>
      </div>
    </div>
      <p style={{marginBottom: "5px"}}>{goodDay? "It's a good day, let's go ride!" : 'Maybe not today...'}</p>
      <button className="button" onClick={props.clearWeather}>New Search</button>
    </div>
    
  )
}
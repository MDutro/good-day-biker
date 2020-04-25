import React from 'react';
import dayEvaluation from './dayEvaluation';
import './NextWeek.css'

const NextWeek = (props) => {

  dayEvaluation();

  return(
    <div>
      <li className="listItem">
        <p>{`${props.date[1]}/${props.date[2]}`}</p> 
        <p>{`${props.high}/${props.low}`}</p>
        <p>{`Precip: ${props.rain}`}</p> 
        <p>{`Wind: ${props.wind}`}</p> 
        <img src={dayEvaluation() ? "bike.png" : "noBike.png"} style={{maxWidth: "30px"}} alt="" />
      </li>
    </div>
  )

}

export default NextWeek;



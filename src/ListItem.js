import React from 'react';
import {useGoodDay} from './useGoodDay';
import './ListItem.css';

const ListItem = (props) => {

  const goodDay = useGoodDay(props.high, props.rain, props.wind)

  return(
    <li className="listItem">
      <p>{props.date}</p> 
      <p>{`${Math.floor(props.high)}/${Math.floor(props.low)}`}</p>
      <p>{`${Math.floor(props.rain)}%`}</p> 
      <p>{Math.round(props.wind)}</p> 
      <img src={goodDay ? "bike.png" : "noBike.png"} style={{maxWidth: "35px"}} alt="" />
    </li>
  )
}

export default ListItem;
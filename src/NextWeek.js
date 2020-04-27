import React from 'react';
import ListItem from './ListItem';
import './NextWeek.css';

const NextWeek = ({weather}) => {
  if(!weather) return null
  
  const dayList = weather.map((day, index) => {
    return(
      <ListItem key={index.toString()}
        date={`${day.datetime.split("-")[1]}/${day.datetime.split("-")[2]}`}
        high={day.high_temp}
        low={day.low_temp}
        rain={day.precip}
        wind={day.wind_spd}
      />
    )
  })

  return(
    <div>
      <div className="weekList">
        <div className="legend">
          <p>Date</p>
          <p>Temp</p>
          <p>Rain</p>
          <p>Wind</p>
          <p>Y/N</p>
        </div>
      </div>
      <hr style={{margin: "0, 0, 3px, 0"}}></hr>
      <ul className="weekList">
        {dayList}
      </ul> 
    </div>
  )
}

export default NextWeek;



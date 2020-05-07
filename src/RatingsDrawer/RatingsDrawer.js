import React from 'react';
import { RateDay } from '../RateDay';
import './RatingsDrawer.css';
import '../SettingsDrawer/SettingsDrawer.css';

export const RatingsDrawer = (props) => {


  return(
    <div className={props.isOpen === true ? "openedDrawer" : ""}>
      <div className="drawer fromRightDrawer">
      <RateDay 
      close={props.close}
      high={props.high}
      rain={props.rain}
      wind={props.wind}
      />
      </div>
    </div>
  )
}
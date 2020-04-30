import React from 'react';
import UserPreferences from '../UserPreferences';
import './SettingsDrawer.css'

export const SettingsDrawer = (props) => {

  return(
    <div className={props.isOpen === true ? "openedDrawer" : ""}>
      <div className="drawer">
      <UserPreferences close={props.close}/>
      </div>
    </div>
  )
}

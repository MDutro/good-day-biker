import * as React from 'react';
import { PreferencesContext } from './PreferencesContext';

export const useGoodDay = (high, rain, wind) => {
  const {preferences} = React.useContext(PreferencesContext)

  if(high >= preferences.high && rain <= preferences.rain && Math.round(wind) <= preferences.wind) {
    return true
  }
    return false
}
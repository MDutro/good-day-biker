import * as React from "react";

export const PreferencesContext = React.createContext({
  preferences: {
    high: 0,
    rain: 0,
    wind: 0,
  },
  setPreferences: () => {},
});

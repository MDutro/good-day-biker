import React from "react";
import { PreferencesContext } from "../utils/PreferencesContext";
import { DEFAULT_SETTINGS } from "../constants";
import "./UserPreferences.css";

export const UserPreferences = (props) => {
  const { preferences, setPreferences } = React.useContext(PreferencesContext);

  const savePreferences = () => {
    localStorage.setItem("user-preferences", JSON.stringify(preferences));
  };

  const defaultSettings = () => {
    localStorage.setItem(
      "user-preferences",
      JSON.stringify(DEFAULT_SETTINGS)
    );
    setPreferences(DEFAULT_SETTINGS);
  };

  return (
    <div className="panel">
      <h1>User Preferences</h1>
      <p className="spacer">
        Minimum temperature: <strong>{preferences.high} F</strong>
      </p>
      <div className="sliderContainer">
        <input
          type="range"
          min="0"
          max="110"
          value={preferences.high}
          className="slider"
          onChange={(e) =>
            setPreferences({ ...preferences, high: e.target.value })
          }
        />
      </div>
      <p className="spacer">
        Maximum precipitation chance: <strong>{preferences.rain}%</strong>
      </p>
      <div className="sliderContainer">
        <input
          type="range"
          min="0"
          max="100"
          value={preferences.rain}
          className="slider"
          onChange={(e) =>
            setPreferences({ ...preferences, rain: e.target.value })
          }
        />
      </div>
      <p className="spacer">
        Maximum wind speed: <strong>{preferences.wind} mph</strong>
      </p>
      <div className="sliderContainer spacer">
        <input
          type="range"
          min="0"
          max="50"
          value={preferences.wind}
          className="slider"
          onChange={(e) =>
            setPreferences({ ...preferences, wind: e.target.value })
          }
        />
      </div>
      <button className="button spacer" onClick={savePreferences}>
        Save
      </button>
      <img
        src="gears.png"
        className="spacer"
        style={{ maxWidth: "175px", marginTop: "10px" }}
        alt=""
      />
      <div className="buttonBar">
        <button className="button" onClick={defaultSettings}>
          Reset
        </button>
        <button className="button" onClick={() => props.close()}>
         Close
        </button>
      </div> 
    </div>
  );
};

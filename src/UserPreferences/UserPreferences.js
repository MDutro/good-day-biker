import React from "react";
import { PreferencesContext } from "../utils/PreferencesContext";
import "./UserPreferences.css";

export const UserPreferences = (props) => {
  const { preferences, setPreferences } = React.useContext(PreferencesContext);

  const savePreferences = () => {
    localStorage.setItem("user-preferences", JSON.stringify(preferences));

    props.close();
  };

  const defaultSettings = () => {
    const defaultPreferences = { high: 65, rain: 25, wind: 10 };
    localStorage.setItem(
      "user-preferences",
      JSON.stringify(defaultPreferences)
    );
    setPreferences(defaultPreferences);

    props.close();
  };

  const ratingsSettings = () => {
    const rating = JSON.parse(localStorage.getItem("user-ratings"));
    const ratingsPrefs = {
      high: Math.floor((rating.good[0] + rating.perfect[0]) / 2),
      rain: Math.floor((rating.good[1] + rating.perfect[1]) / 2),
      wind: Math.floor((rating.good[2] + rating.perfect[2]) / 2),
    };
    localStorage.setItem("user-preferences", JSON.stringify(ratingsPrefs))
    setPreferences(ratingsPrefs)
    props.close();
  };

  return (
    <div className="panel">
      <h1>User Preferences</h1>
      <p>
        Minimum temperature: <strong>{preferences.high}</strong>
      </p>
      <div className="sliderContainer">
        <input
          type="range"
          min="-40"
          max="110"
          value={preferences.high}
          className="slider"
          onChange={(e) =>
            setPreferences({ ...preferences, high: e.target.value })
          }
        />
      </div>
      <p>
        Maximum precipitaion chance: <strong>{preferences.rain}</strong>
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
      <p>
        Maximum wind speed: <strong>{preferences.wind}</strong>
      </p>
      <div className="sliderContainer">
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
      <button className="button" onClick={savePreferences}>
        Save
      </button>
      <img
        src="gears.png"
        style={{ maxWidth: "175px", marginTop: "10px" }}
        alt=""
      />
      <p>Use day rating history to set preferences?</p>
      <button className="button" onClick={ratingsSettings}>
        Do it!
      </button>
      <button className="button" onClick={defaultSettings}>
        Reset
      </button>
    </div>
  );
};

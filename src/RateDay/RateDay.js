import React, { useReducer } from "react";
import { PreferencesContext } from "../utils/PreferencesContext";
import "../UserPreferences/UserPreferences.css";

const initialRating = JSON.parse(localStorage.getItem("user-ratings")) || {
  poor: [65, 25, 10],
  bad: [65, 25, 10],
  ok: [65, 25, 10],
  good: [65, 25, 10],
  perfect: [65, 25, 10],
};

export const RateDay = (props) => {
  const { setPreferences } = React.useContext(PreferencesContext);

  // Take the current day's conditions and average them with the baseline and/or saved conditions in local storage
  const rateDate = (stateArr) => [
    Math.floor((stateArr[0] + props.high) / 2),
    Math.floor((stateArr[1] + props.rain) / 2),
    Math.floor((stateArr[2] + props.wind) / 2),
  ];

  const ratingReducer = (state, action) => {
    switch (action.type) {
      case "poor":
        return { ...state, poor: rateDate(state.poor) };
      case "bad":
        return { ...state, bad: rateDate(state.poor) };
      case "ok":
        return { ...state, ok: rateDate(state.poor) };
      case "good":
        return { ...state, good: rateDate(state.good) };
      case "perfect":
        return { ...state, perfect: rateDate(state.perfect) };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ratingReducer, initialRating);

  const saveRating = () => {
    localStorage.setItem("user-ratings", JSON.stringify(state));
    document.getElementById("submit").innerText= "Thanks for your feedback!"
  };

  const handleChange = (e) => {
    dispatch({ type: e.target.value });
  };

  const ratingsSettings = () => {
    const rating = JSON.parse(localStorage.getItem("user-ratings"));
    if(rating) {
      const ratingsPrefs = {
      high: Math.floor((rating.good[0] + rating.perfect[0]) / 2),
      rain: Math.floor((rating.good[1] + rating.perfect[1]) / 2),
      wind: Math.floor((rating.good[2] + rating.perfect[2]) / 2),
    };
      localStorage.setItem("user-preferences", JSON.stringify(ratingsPrefs))
      setPreferences(ratingsPrefs)
      document.getElementById("ratings").innerText= "Thanks for your feedback!"
    }
    document.getElementById("ratings").innerText= "No day ratings found! Get out there and ride!"
  };

  return (
    <div className="panel">
      <h1>Rate your ride!</h1>
      <select onChange={handleChange} className="spacer">
        <option value=""></option>
        <option value={"poor"}>1 - Poor Conditions</option>
        <option value={"bad"}>2 - Pretty Bad</option>
        <option value={"ok"}>3 - Okay</option>
        <option value={"good"}>4 - Pretty Good</option>
        <option value={"perfect"}>5 - Almost Perfect</option>
      </select>
      <p id="submit" className="spacer"></p>
      <button className="button spacer" onClick={saveRating}>
        Submit
      </button>
      <img src="rating.png" style={{ maxWidth: "250px"}} alt="" />
      <p id="ratings" className="spacer">Use day rating history to set preferences?</p>
      <button className="button spacer spacer" onClick={ratingsSettings}>
        Do it!
      </button>
      <button className="button spacer" onClick={() => props.close()}>
        Close
      </button>
    </div>
  );
};

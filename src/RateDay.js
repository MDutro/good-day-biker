import React, { useReducer } from "react";
import "./UserPreferences.css";

const initialRating = JSON.parse(localStorage.getItem("user-ratings")) || {
  poor: [65, 25, 10],
  bad: [65, 25, 10],
  ok: [65, 25, 10],
  good: [65, 25, 10],
  perfect: [65, 25, 10],
};

export const RateDay = (props) => {

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
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(ratingReducer, initialRating);

  const saveRating = () => {
    localStorage.setItem("user-ratings", JSON.stringify(state));
    props.close();
  };

  const handleChange = (e) => {
    dispatch({ type: e.target.value });
  };

  return (
    <div className="panel">
      <h1>Rate your ride!</h1>
      <select onChange={handleChange}>
        <option value={"poor"}>1 - Poor Conditions</option>
        <option value={"bad"}>2 - Pretty Bad</option>
        <option value={"ok"}>3 - Okay</option>
        <option value={"good"}>4 - Pretty Good</option>
        <option value={"perfect"}>5 - Almost Perfect</option>
      </select>
      <button className="button" onClick={saveRating}>
        Submit
      </button>
    </div>
  );
};

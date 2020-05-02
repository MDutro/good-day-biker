import React, { useReducer } from "react";
import "./UserPreferences.css";

const initialRating = { poor: [65, 25, 10], bad: [65, 25, 10], ok: [65, 25, 10], good: [65, 25, 10], perfect: [65, 25, 10] };

export const RateDay = (props) => {

  // const [userChoice, setUserChoice] = useState(undefined)

  const ratingReducer = (state, action) => {
    switch (action.type) {
      case "poor":
        return {...state, poor: [Math.floor((state.poor[0] + props.high)/2), Math.floor((state.poor[1] + props.rain)/2), Math.floor((state.poor[2] + props.wind))/2]};
      case "bad":
        return {...state, bad: [Math.floor((state.bad[0] + props.high)/2), Math.floor((state.bad[1] + props.rain)/2), Math.floor((state.bad[2] + props.wind)/2)]};
      case "ok":
        return {...state, ok: [Math.floor((state.ok[0] + props.high)/2), Math.floor((state.ok[1] + props.rain)/2), Math.floor((state.ok[2] + props.wind)/2)]};
      case "good":
        return {...state, good: [Math.floor((state.good[0] + props.high)/2), Math.floor((state.good[1] + props.rain)/2), Math.floor((state.good[2] + props.wind)/2)]};
      case "perfect":
        return {...state, perfect: [Math.floor((state.perfect[0] + props.high)/2), Math.floor((state.perfect[1] + props.rain)/2), Math.floor((state.perfect[2] + props.wind)/2)]};
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
    dispatch({type: e.target.value})
  }

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

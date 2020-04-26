import preferences from "./preferences";

const dayEvaluation = (high, rain, wind) => {
  if(high >= preferences.high && rain <= preferences.rain && Math.round(wind) <= preferences.wind) {
    return true
  }
    return false
}

export default dayEvaluation;

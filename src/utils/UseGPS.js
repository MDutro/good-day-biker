import { useState, useEffect, useCallback } from "react";

export const useGPS = () => {

  // gps returns as an array of latitude and longitude
  const [gps, setGps] = useState(null)
  
  // Attempt geolocation for user and make API call with GPS results as search parameter
 const gpsFunction = useCallback(() => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => setGps(
            [position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2)]
        ), e => console.error(e))        
      };
  }, [])

  useEffect(() => gpsFunction(), [gpsFunction])
  return gps
}
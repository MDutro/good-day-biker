import React, { useState } from 'react';
import './SearchBar.css'

export const SearchBar = (props) => {
  const [city, setCity] = useState('')

  const onFormSubmit = event => {
    event.preventDefault();

    props.onSubmit(city);
  };

  return(
    <div className="card">
      <h2>Good day to ride?</h2>
    <div className="wrap">
      <form className="search" onSubmit={onFormSubmit}>
      <input type="text" 
            onChange={e => setCity(e.target.value)} 
            value={city} 
            className="searchTerm" 
            placeholder='Enter "City, State"'
          />
      <button type="submit" className="searchButton">
        <img src='search.png' style={{width: "20px"}} alt='submit search' />
      </button>
      </form>
      <img src="queryBike.png" style={{maxWidth: "150px"}} alt="" />
    </div> 
    </div>
  )
}
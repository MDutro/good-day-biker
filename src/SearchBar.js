import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = (props) => {
  const [city, setCity] = useState('')

  const onFormSubmit = event => {
    event.preventDefault();

    props.onSubmit(city);
  };

  return(
    <div>
      <h2>Good day to ride?</h2>
    <div className="wrap">
      <form className="search" onSubmit={onFormSubmit}>
      <input type="text" 
            onChange={e => setCity(e.target.value)} 
            value={city} 
            className="searchTerm" 
            placeholder="Enter City" 
          />
      <button type="submit" className="searchButton">
        <img src='search.svg' alt='submit search' />
      </button>
      </form>
    </div> 
    </div>
  )
}

export default SearchBar;
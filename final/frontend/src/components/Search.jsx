import React, { useState } from 'react';

const ProductSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/search/${searchInput}`);
      const data = await response.json();

      if (response.ok) {
        if (data.length > 0) {
          setSearchResults(data.map((product, index) => (
            <li key={index}>{product.product_name}</li>
          )));
        } else if (data.suggestions && data.suggestions.length > 0) {
          setSearchResults(
            <div>
              <p>No exact match found. Did you mean:</p>
              <ul>
                {data.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion.term}</li>
                ))}
              </ul>
            </div>
          );
        } else {
          setSearchResults(<p>No results found.</p>);
        }
      } else {
        setErrorMessage('Error fetching data.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for a product"
      />
      <button onClick={searchProducts}>Search</button>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <h2>Search Results</h2>
        <ul>{searchResults}</ul>
      </div>
    </div>
  );
};

export default ProductSearch;

import React, { useState } from 'react';
import axios from 'axios';
import './NutrientsSearch.css';

const NutrientsSearch = () => {
  const [nutrient, setNutrient] = useState('');
  const [value, setValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!nutrient || !value) {
      setError('Please enter both nutrient and value');
      return;
    }
    setError('');

    try {
      const response = await axios.get(`/api/search/?ingredient=${nutrient}&value=${value}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes', error);
      setError('Failed to fetch recipes. Please try again later.');
    }
  };

  return (
    <div className="search-container">
      <h2>Search by Nutrients</h2>
      <div className="search-fields">
        <input
          type="text"
          placeholder="Enter nutrient (e.g., protein)"
          value={nutrient}
          onChange={(e) => setNutrient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter value (e.g., 10)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="results">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
              <p>{recipe.strInstructions}</p>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default NutrientsSearch;

import React, { useState } from 'react';
import axios from 'axios';
import './DietPreferencesSearch.css';

const DietPreferencesSearch = () => {
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!diet) {
      setError('Please enter a diet preference');
      return;
    }
    setError('');

    try {
      const response = await axios.get(`/api/search/?category=${diet}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes', error);
      setError('Failed to fetch recipes. Please try again later.');
    }
  };

  return (
    <div className="search-container">
      <h2>Search by Diet Preferences</h2>
      <div className="search-fields">
        <input
          type="text"
          placeholder="Enter diet (e.g., Vegan, Vegetarian)"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
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

export default DietPreferencesSearch;

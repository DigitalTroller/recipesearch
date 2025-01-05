// RecipeSearch.js

import React, { useState } from 'react';
import axios from 'axios';
import './RecipeSearch.css'; // Import the CSS

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/recipes/search/?q=${searchTerm}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes', error);
    }
  };

  return (
    <div>
      <div className="recipe-search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;

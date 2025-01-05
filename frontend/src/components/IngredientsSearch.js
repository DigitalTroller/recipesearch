import React, { useState } from "react";
import "./IngredientsSearch.css";

const IngredientsSearch = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient to search.");
      return;
    }
  
    setError(""); // Clear error
    try {
        const response = await fetch("http://127.0.0.1:8000/api/search-ingredient/?ingredient=" + ingredient);
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
          setError("No recipes found for the given ingredient.");
        }
      } else {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        setError(errorData.error || "Error fetching recipes. Please try again later.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="ingredients-search">
      <h2>Search Recipes by Ingredient</h2>
      <input
        type="text"
        placeholder="Enter an ingredient (e.g., chicken_breast)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </div>
          ))
        ) : (
          !error && <p>No recipes to display. Try searching for an ingredient.</p>
        )}
      </div>
    </div>
  );
};

export default IngredientsSearch;

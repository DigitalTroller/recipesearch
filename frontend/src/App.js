import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeSearch from './components/RecipeSearch';
import IngredientsSearch from './components/IngredientsSearch';
import NutrientsSearch from './components/NutrientsSearch';
import DietPreferencesSearch from './components/DietPreferencesSearch';
import ProfilePage from './components/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Recipe Search</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/ingredients-search">Search by Ingredients</Link></li>
              <li><Link to="/nutrients-search">Search by Nutrients</Link></li>
              <li><Link to="/diet-preferences-search">Diet Preferences</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<RecipeSearch />} />
            <Route path="/ingredients-search" element={<IngredientsSearch />} />
            <Route path="/nutrients-search" element={<NutrientsSearch />} />
            <Route path="/diet-preferences-search" element={<DietPreferencesSearch />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

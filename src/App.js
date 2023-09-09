// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);
  const [alert, setAlert] = useState('');

  const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  const handleSearch = async () => {
    if (!searchTerm) {
      setAlert('Enter a food name to search');
      return;
    }

    try {
      const response = await fetch(apiUrl + searchTerm);
      const data = await response.json();

      if (data.meals) {
        setMeals(data.meals);
        setAlert('');
      } else {
        setMeals([]);
        setAlert('No food found');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert('An error occurred while fetching data');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 d-none d-md-block bg-light sidebar">
          <div className="position-sticky">
            <h1 className="text-center mt-3">Meal Finder</h1>
            <div className="mb-3">
              {alert && <div className="alert alert-danger">{alert}</div>}
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search-bar"
                  placeholder="Enter a food name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary search-btn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="col-md-10 ms-sm-auto">
          <div className="container mt-3">
            <div className="row">
              {meals.map((meal) => (
                <div className="col-md-4 mb-4" key={meal.idMeal}>
                  <div className="card">
                    <img
                      src={meal.strMealThumb}
                      className="card-img-top"
                      alt={meal.strMeal}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{meal.strMeal}</h5>
                      <p className="card-text">{meal.strInstructions.slice(0, 100)}</p>
                      <a
                        href={meal.strYoutube}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Video
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

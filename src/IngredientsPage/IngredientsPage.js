import './ingredient-page.css';
import React, {useState, useEffect} from 'react';
import ingredients from './ingredients.json';
import SuggestionsList from './SuggestionsList';
import IngredientsListElement from './IngredientsListElement';
import CocktailDBProvider from '../providers/CocktailDBProvider';
import DrinksList from './DrinksList';

function IngredientsPage() {
  const ingredientList = ingredients.ingredients;
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [suggestedHighlighted, setSuggestedHighlighted] =
    useState(null);
  const [input, setInput] = useState('');
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    if (suggestedHighlighted !== null)
      setInput(suggestedHighlighted.name);
  }, [suggestedHighlighted]);

  function addSuggestions() {
    ingredientList.forEach((ingredient) => {
      if (
        ingredient.name.toLowerCase().includes(input.toLowerCase()) &&
        !usedIngredients.includes(ingredient)
      ) {
        setSuggested((ingredients) => [...ingredients, ingredient]);
      }
    });
  }

  function addIngredient(ingredient) {
    for (let i = 0; i < usedIngredients.length; i++) {
      if (usedIngredients[i].name === ingredient.name) return;
    }
    setUsedIngredients((ingredients) => [...ingredients, ingredient]);
    setInput('');
    setSuggested([]);
    setSuggestedHighlighted(null);
  }

  function removeIngredient(ingredient) {
    setUsedIngredients((ingredients) =>
      ingredients.filter(
        (element) => element.name !== ingredient.name
      )
    );
  }

  const handleInputChange = React.useCallback((event) => {
    setInput(event.target.value);
    setSuggested([]);
    setSuggestedHighlighted(null);
    if (input.length > 2) {
      addSuggestions(input);
    }
  });

  const handleKeyDown = React.useCallback((event) => {
    if (input.length < 3 || suggested.length === 0) return;

    if (event.key === 'Enter') {
      setInput(event.target.value);
      const exactMatchList = suggested.filter(
        (suggested) =>
          suggested.name.toLowerCase() === input.toLowerCase()
      );
      if (exactMatchList.length > 0) {
        addIngredient(exactMatchList[0]);
      }
    }

    if (event.key === 'ArrowDown') {
      if (suggestedHighlighted === null) {
        setSuggestedHighlighted(suggested[0]);
        return;
      }

      const idx = suggested.findIndex(
        (suggested) => suggested === suggestedHighlighted
      );
      if (idx === -1) {
        setSuggestedHighlighted(null);
        return;
      }

      if (idx + 1 < suggested.length) {
        setSuggestedHighlighted(suggested[idx + 1]);
        return;
      }
    }

    if (event.key === 'ArrowUp') {
      if (suggestedHighlighted === null) {
        setSuggestedHighlighted(suggested[-1]);
        return;
      }

      const idx = suggested.findIndex(
        (ingredient) => ingredient === suggestedHighlighted
      );
      if (idx === -1) {
        setSuggestedHighlighted(null);
        return;
      }

      if (idx - 1 >= 0) {
        setSuggestedHighlighted(suggested[idx - 1]);
        return;
      }
    }
  });

  const handleRequest = React.useCallback(() => {
    CocktailDBProvider.getDrinksByIngredients(usedIngredients).then(
      (res) => {
        setDrinks(res);
      }
    );
    console.log(drinks);
  });

  const handleAddIngredient = React.useCallback(
    (ingredient) => (e) => {
      addIngredient(ingredient);
    }
  );
  const handleRemoveIngredient = React.useCallback(
    (ingredient) => (e) => {
      removeIngredient(ingredient);
    }
  );

  return (
    <div className="ingredients-page-container">
      <div className="ingredients-list-container">
        <div className="input-container">
          <input
            type="text"
            className="ingredients-input"
            placeholder="enter ingredient name..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={input}
          />
          <SuggestionsList
            suggestionsList={suggested}
            suggestedHighlighted={suggestedHighlighted}
            addIngredientFunction={handleAddIngredient}
          />
        </div>
        <h3>Used ingredients: </h3>
        <div className="ingredients-list">
          {usedIngredients.length > 0
            ? usedIngredients.map((ingredient) => {
                return (
                  <IngredientsListElement
                    key={ingredient.name}
                    ingredient={ingredient}
                    removeFunc={handleRemoveIngredient}
                  />
                );
              })
            : 'none :c. Enter ingredient in textbox '}
        </div>
        {usedIngredients.length > 0 ? (
          <button
            type="button"
            onClick={handleRequest}
            className="ingredients-send-btn"
          >
            Find me a drink!
          </button>
        ) : (
          ''
        )}
      </div>
      {drinks.length > 0 ? <DrinksList drinks={drinks} /> : ''}
    </div>
  );
}

export default IngredientsPage;

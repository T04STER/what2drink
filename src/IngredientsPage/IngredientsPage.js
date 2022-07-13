import React, { useState, useEffect } from 'react'
import ingredients from './ingredients.json'
import './ingredient-page.css'
import SuggestionsList from './SuggestionsList'
import IngredientsListElement from './IngredientsListElement'
import CocktailDBProvider from '../providers/CocktailDBProvider'
import DrinksList from './DrinksList'

function IngredientsPage() {
  const ingredientList = ingredients.ingredients;
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [suggestedHighlighted, setSuggestedHighlighted] = useState(null);
  const [input, setInput] = useState('');
  const [drinks, setDrinks] = useState([]);
  
  useEffect(() => {
    if (suggestedHighlighted!==null)
      setInput(suggestedHighlighted.name);
  }, [suggestedHighlighted])
  

  function addSuggestions () {
    ingredientList.forEach((ingredient) => {
        if (ingredient.name.toLowerCase().includes(input.toLowerCase())&&
            !usedIngredients.includes(ingredient)) {    
          setSuggested(suggested=>[...suggested, ingredient]);
        }
    })
  }

  function handleInputChange(event) {
    setInput(event.target.value);
    setSuggested([]);
    setSuggestedHighlighted(null);
    if (input.length > 2) {
      addSuggestions(input);
    }
    
  }

  const handleKeyDown = React.useCallback((event) => {    
    

    if (input.length < 3 || suggested.length === 0)
      return;
    
    
    if (event.key === "Enter") {
      setInput(event.target.value);
      let exactMatchList = suggested.filter(suggested => suggested.name.toLowerCase()===input.toLowerCase());
      if (exactMatchList.length>0) {
        addIngredient(exactMatchList[0]);
      }
    }

    if (event.key === "ArrowDown") {
      
      if (suggestedHighlighted===null) {
        setSuggestedHighlighted(suggested[0]);
        return;
      }

      let idx = suggested.findIndex(suggested => suggested === suggestedHighlighted);
      if (idx === -1) {
        setSuggestedHighlighted(null);
        return;
      }
      
      if (idx+1 < suggested.length) {
        setSuggestedHighlighted(suggested[idx + 1]);
        return;
      }
    }

    if (event.key === "ArrowUp") {
      
      if (suggestedHighlighted===null) {
        setSuggestedHighlighted(suggested[-1]);
        return;
      }

      let idx = suggested.findIndex(suggested => suggested === suggestedHighlighted);
      if (idx === -1) {
        setSuggestedHighlighted(null);
        return;
      }
      
      if (idx-1 >= 0) {
        setSuggestedHighlighted(suggested[idx - 1]);
        return;
      }
    }
  });

  const addIngredient = React.useCallback((ingredient)=>{
    for (let i = 0; i < usedIngredients.length; i++) {
      if (usedIngredients[i].name===ingredient.name) return;
    }
    setUsedIngredients((usedIngredients) => [...usedIngredients, ingredient]);
    setInput('');
    setSuggested([]);
    setSuggestedHighlighted(null);
  });

  function removeIngredient(ingredient) {
    setUsedIngredients((usedIngredients) => usedIngredients.filter(element => element.name!==ingredient.name));
  }

  const handleRequest = React.useCallback(() => {
    CocktailDBProvider.getDrinksByIngredients(usedIngredients)
      .then(res => {
        setDrinks(res);
      } 
    );
    console.log(drinks);
  }
  );

  return (
    <div className="ingredients-page-container">
        <div className="ingredients-list-container">
          <div className="input-container">
            <input
              type="text"
              className="ingredients-input"
              placeholder='enter ingredient name...'
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={input}
            />
            <SuggestionsList 
              suggestionsList={suggested}
              suggestedHighlighted={suggestedHighlighted} 
              addIngredientFunction={addIngredient}
            />
          </div>
          <h3>Used ingredients: </h3>
          <div className="ingredients-list">
            {
                usedIngredients.length>0 ? (
                usedIngredients.map(ingredient => {
                    return (<IngredientsListElement
                            key={ingredient.name}
                            ingredient={ingredient}
                            removeFunc={removeIngredient}
                            />);
                })
                ):"none :c. Enter ingredient in textbox "
            }
          </div>
          {
            usedIngredients.length > 0? (
              <button
               onClick={handleRequest}
               className="ingredients-send-btn"
              >
               Find me a drink!
              </button>
            ):''
          }
        </div>
        {drinks.length>0?(
          <DrinksList drinks={drinks}/>
        ):''}
    </div>
  )
}

export default IngredientsPage;
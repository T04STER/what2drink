import React, { useState, useEffect } from 'react'
import CocktailDBProvider from '../providers/CocktailDBProvider';

function DrinksListItem(props) {
  const [drink, setDrink] = useState(props.drink);
  const [ingredients, setIngredients] = useState([]);

  function handleClick () {
    CocktailDBProvider.getDrinkByID(drink.idDrink)
        .then((drink) => setDrink(drink));
  }

  useEffect(() => {
    const drinkKeys = Object.keys(drink);
    drinkKeys.forEach(key => {
    if (key.includes('Ingredient') && drink[key] !== null) {
      setIngredients(ingredients=>[...ingredients, drink[key]]);
    }
  });
  }, [drink]);

  return (
    <div className="drinks-list-item">
      <h3>{drink.strDrink}</h3>
      <img src={drink.strDrinkThumb} alt="no img ;c"></img>
      <button onClick={()=>handleClick()} >
        Get more info
      </button>
      {
       (ingredients.length > 0)?(
        <div>
            <div className="drink-ingredients">
            <p>Ingredients:</p>
            <ul>
                {
                ingredients.map(function (ingredient) {
                    return (
                    <li key={ingredient.toString()}>
                        {ingredient}
                    </li>
                    );
                }
                )
                }
            </ul>
            </div>
            <p className="drink-instructions">{drink.strInstructions}</p>
        </div>
       ):''
      }
    </div>
  )
}

export default DrinksListItem
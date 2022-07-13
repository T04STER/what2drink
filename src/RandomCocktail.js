import React, {useEffect, useState} from 'react'
import CocktailDBProvider from './providers/CocktailDBProvider';
import RefreshButton from './RefreshButton'
 

function RandomCocktail() {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState([]);


  useEffect(() => {
    CocktailDBProvider.getRandomDrink().then(res => {
      setDrink(res);
      console.log(res);
      const drinkKeys = Object.keys(res);
      
      drinkKeys.forEach(key => {
        if (key.includes('Ingredient') && drink[key] !== null) {
          setIngredients(ingredients=>[...ingredients, drink[key]]);
        }
      });    
    })
  });

  
  
  return (<>
    {drink?(
    <div className="drink-container">
      <h2>{drink.strDrink}</h2>
      <img src={drink.strDrinkThumb} alt="no img ;c"></img>
      
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
      <p>{drink.strInstructions}</p>
      <RefreshButton /> 
    </div>
    ):""}
</>)
}

export default RandomCocktail;

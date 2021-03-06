import React, {useEffect, useState} from 'react';
import CocktailDBProvider from './providers/CocktailDBProvider';
import RefreshButton from './RefreshButton';

function RandomCocktail() {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    CocktailDBProvider.getRandomDrink().then((res) => {
      setDrink(res);
      const drinkKeys = Object.keys(res);

      drinkKeys.forEach((key) => {
        if (key.includes('Ingredient') && res[key] !== null) {
          setIngredients((ingredientz) => [...ingredientz, res[key]]);
        }
      });
    });
  }, []);

  return (
    <>
      {drink ? (
        <div className="drink-container">
          <h2>{drink.strDrink}</h2>
          <img src={drink.strDrinkThumb} alt="no img ;c" />

          <div className="drink-ingredients">
            <p>Ingredients:</p>
            <ul>
              {ingredients.map((ingredient, idx) => {
                return <li key={idx.toString()}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <p>{drink.strInstructions}</p>
          <RefreshButton />
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default RandomCocktail;

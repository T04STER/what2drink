import React from 'react'
import DrinksListItem from './DrinksListItem'
import './drinks-list.css'
export default function DrinksList(props) {
  const drinks = props.drinks;
  return (
    <div className="drinks-list-container">
        <h2>Found folowing drinks:</h2>
        <div className="drinks-list-list">
            {
            drinks.map(drink => {
                return <DrinksListItem key={drink.strDrink} drink={drink}/>;
            })
            }
        </div>
    </div>
  )
}

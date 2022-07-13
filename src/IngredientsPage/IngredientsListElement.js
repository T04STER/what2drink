import React from 'react'

function IngredientsListElement(props) {
  return (
    <div className="ingredients-element-container">
        <div className="ingredients-element-name">
        {props.ingredient.name}
        </div>
        <button onClick={() => {props.removeFunc(props.ingredient)}} className="ingredients-element-remove-btn">
        X
        </button>
    </div>
  )
}

export default IngredientsListElement
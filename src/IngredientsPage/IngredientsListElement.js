import React from 'react';

function IngredientsListElement(props) {
  const {ingredient, removeFunc} = props;
  return (
    <div className="ingredients-element-container">
      <div className="ingredients-element-name">
        {ingredient.name}
      </div>
      <button
        type="button"
        onClick={removeFunc(ingredient)}
        className="ingredients-element-remove-btn"
      >
        X
      </button>
    </div>
  );
}

export default IngredientsListElement;

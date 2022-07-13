import React from 'react';

function SuggestionsList(props) {
  const {
    suggestionsList,
    suggestedHighlighted,
    addIngredientFunction,
  } = props;
  return (
    <ul className="suggestions-list">
      {suggestionsList.map((suggestion) => {
        return (
          <li
            role="button"
            onClick={addIngredientFunction(suggestion)}
            key={suggestion.name}
            className={
              suggestion === suggestedHighlighted
                ? 'suggestions-list-highlight'
                : ''
            }
          >
            {suggestion.name}
          </li>
        );
      })}
    </ul>
  );
}

export default SuggestionsList;

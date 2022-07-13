import React from 'react'

function SuggestionsList(props) {
  const suggested = props.suggestionsList;
  return (
    <ul className="suggestions-list">
        {
          suggested.map(suggestion =>{
            return (                      
            <li onClick={()=>props.addIngredientFunction(suggestion)}
                key={suggestion.name}
                className={suggestion===props.suggestedHighlighted ? 'suggestions-list-highlight':''}
            >        
                {suggestion.name}
            </li>
            )
            })
        }
    </ul>
  )
}

export default SuggestionsList
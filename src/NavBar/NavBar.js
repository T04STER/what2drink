import './navbar.css';
import React from 'react';

function NavBar(props) {
  const {homePage, setHomePage} = props;
  return (
    <div className="navbar">
      <ul>
        <li>
          <button
            type="button"
            className={homePage ? 'active' : null}
            onClick={() => {
              setHomePage(true);
            }}
          >
            What2Drink
          </button>
        </li>
        <li>
          <button
            type="button"
            className={homePage ? null : 'active'}
            onClick={() => {
              setHomePage(false);
            }}
          >
            Select Ingredients
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

import React from 'react'
import './navbar.css'

function NavBar(props) {
  return (
    <div className="navbar">
        <ul>
            <li>
                <button className={props.homePage?'active':null} onClick={() => {props.setHomePage(true);}} >
                    What2Drink
                </button>
            </li>
            <li>
                <button className={props.homePage?null:'active'} onClick={() => {props.setHomePage(false);}} >
                    Select Ingredients
                </button>
            </li>

        </ul>
    </div>
  )
}

export default NavBar
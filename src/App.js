import './App.css';
import { useState } from 'react';
import RandomCocktail from './RandomCocktail';
import NavBar from './NavBar/NavBar'
import IngredientsPage from './IngredientsPage/IngredientsPage'

function App() {
  const [homePage, setHomePage] = useState(true);

  return (
    <div className="App">
      <NavBar homePage={homePage} setHomePage={setHomePage} />
      {homePage ? <RandomCocktail />: <IngredientsPage />}
    </div>
  );
}

export default App;

import axios from "axios"

export default class CocktailDBProvider {
  static async getRandomDrink() {
    const options = {
      method: 'GET',
      url: 'https://the-cocktail-db.p.rapidapi.com/random.php',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_COCKTAIL_API_KEY}`,
        'X-RapidAPI-Host':`${process.env.REACT_APP_COCKTAIL_API_HOST}`
      }
    };
      
    const res = axios.request(options)
    .then((response) => {
      return response.data.drinks[0];
    })
    .catch(
      (error) => console.error(error)
      );
    
    return res;
  }
  
  static async getDrinksByIngredients(ingredients) {
    let req_params = ingredients.map(ingredient =>ingredient.name).join(',').replace(' ','_');
    const options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
    params: {i: `${req_params}`},
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_COCKTAIL_API_KEY}`,
      'X-RapidAPI-Host':`${process.env.REACT_APP_COCKTAIL_API_HOST}`
    }
    };

    const res = await axios.request(options)
      .then((response) => {
        return response.data.drinks;
      })
      .catch(
        (error) => console.error(error)
      );

    return res;
  }

  static async getDrinkByID(drinkID) {
    const options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
    params: {i: `${drinkID}`},
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_COCKTAIL_API_KEY}`,
      'X-RapidAPI-Host':`${process.env.REACT_APP_COCKTAIL_API_HOST}`
    }
    };
    
    const res = await axios.request(options)
      .then((response) => {
        return response.data.drinks[0];
      })
      .catch(
        (error) => console.error(error)
      );
    return res;
  }
}

import '../components/item-list.js';
import '../components/item-card.js';
import data from '../public/data/DATA.json'

const main = () => {
  const renderRestaurants = () => {
    const restaurantListElement = document.createElement('item-list');
    
    restaurantListElement.datas = data?.restaurants;
    document.getElementById('restaurant-list__container').appendChild(restaurantListElement);
  }
  
  renderRestaurants();
}

export default main;
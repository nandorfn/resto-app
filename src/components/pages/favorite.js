import RestaurantDB from '../../scripts/data/database';
import { emptyPage } from '../molecules/empty-page';

const Favorite = {
  async render() {
    return `
    <section id="restaurant-list" class="min-h-70 pt-5">
      <h2 class="restaurant-list__title">Your Favorite Restaurants</h2>
      <div id="restaurant-list__container"></div>
    </section>
    `;
  },

  async afterRender() {
    const restaurantList = document.getElementById('restaurant-list__container');
    const renderRestaurants = async () => {
      try {
        const restaurantListElement = document.createElement('item-list');
        const data = await RestaurantDB.getAllResto();
        if (data?.length > 0) {
          restaurantListElement.datas = data;
          restaurantList.appendChild(restaurantListElement);
        } else {
          restaurantList.innerHTML = `
            <div>
              <h4>Your favorites is empty</h4>
            </div>
          `;
          throw new Error('Failed to get restaurant data');
        }
      } catch (error) {
        restaurantList.innerHTML = emptyPage();
      }
    };

    renderRestaurants();
  },
};

export default Favorite;

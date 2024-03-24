import RestaurantDB from '../../scripts/data/database';

const Favorite = {
  async render() {
    return `
    <section id="restaurant-list" class="mt-5">
      <h2 class="restaurant-list__title">Your Favorite Restaurants</h2>
      <div id="restaurant-list__container"></div>
    </section>
    `;
  },

  async afterRender() {
    const renderRestaurants = async () => {
      try {
        const restaurantListElement = document.createElement('item-list');
        const data = await RestaurantDB.getAllResto();

        if (data && data.restaurants) {
          restaurantListElement.datas = data.restaurants;
          document.getElementById('restaurant-list__container').appendChild(restaurantListElement);
        } else {
          throw new Error('Failed to fetch restaurant data');
        }
      } catch (error) {
        console.error('Error rendering restaurants:', error.message);
      }
    };

    renderRestaurants();
  },
};

export default Favorite;

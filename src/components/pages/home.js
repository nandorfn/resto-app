import fetchData from '../../api/api';
import { apiEndpoint } from '../../scripts/const';
import '../organisms/hero-app';
import '../organisms/stats-card';
import '../organisms/item-list';
import '../organisms/item-card';

const Home = {
  async render() {
    return `
    <hero-app></hero-app>
    <stats-card></stats-card>
    <section id="restaurant-list">
      <h2 class="restaurant-list__title">Nearby Restaurants</h2>
      <div id="restaurant-list__container"></div>
    </section>
    `;
  },

  async afterRender() {
    const renderRestaurants = async () => {
      try {
        const restaurantListElement = document.createElement('item-list');
        const data = await fetchData({ url: apiEndpoint.getAll });

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

document.addEventListener('DOMContentLoaded', async () => {
  const mainContentElement = document.getElementById('mainContent');
  mainContentElement.innerHTML = await Home.render();
  Home.afterRender();
});

export default Home;

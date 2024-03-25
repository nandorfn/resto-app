import fetchData from '../../api/api';
import { apiEndpoint } from '../../scripts/const';
import '../organisms/hero-app';
import '../organisms/stats-card';
import '../organisms/item-list';
import '../organisms/item-card';
import { error404 } from '../molecules/empty-page';

const Home = {
  async render() {
    return `
    <hero-app></hero-app>
    <stats-card></stats-card>
    <section id="restaurant-list">
      <h2 class="restaurant-list__title">Nearby Restaurants</h2>
      <form id="searchForm">
        <input type="text" id="searchInput" placeholder="Find your favorite restaurants"/>
        <button type="submit">Search</button>
      </form>
      <div id="restaurant-list__container"></div>
    </section>
    `;
  },

  async afterRender() {
    const listContainer = document.getElementById('restaurant-list__container');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');

    listContainer.innerHTML = `
      <div class="loader"></div>
    `;

    const renderRestaurants = async () => {
      try {
        let data = [];
        const restaurantListElement = document.createElement('item-list');
        if (searchInput.value.trim() !== '') {
          data = await fetchData({
            url: `${apiEndpoint.search}${searchInput.value}`,
          });
        } else {
          data = await fetchData({ url: apiEndpoint.getAll });
        }

        if (data && data.restaurants) {
          restaurantListElement.datas = data.restaurants;
          listContainer.innerHTML = '';
          listContainer.appendChild(restaurantListElement);
        } else {
          throw new Error('Failed to fetch restaurant data');
        }
      } catch (error) {
        listContainer.innerHTML = error404();
      }
    };

    renderRestaurants();

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      renderRestaurants();
    });
  },
};

document.addEventListener('DOMContentLoaded', async () => {
  const mainContentElement = document.getElementById('mainContent');
  mainContentElement.innerHTML = await Home.render();
  Home.afterRender();
});

export default Home;

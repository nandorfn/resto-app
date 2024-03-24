import fetchData from '../../api/api';
import { apiEndpoint } from '../../scripts/const';
import UrlParser from '../../scripts/routes/url-parser';
import '../organisms/item-detail';
import '../organisms/detail-skeleton';

const Detail = {
  async render() {
    return `
      <div id="detail-element"></div>
    `;
  },

  async afterRender() {
    const detailElement = document.querySelector('#detail-element');
    const skeletonElement = document.createElement('detail-skeleton');
    detailElement.appendChild(skeletonElement);

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const movie = await fetchData({ url: `${apiEndpoint.getDetail}/${url?.id}` });
      const restaurantDetailElement = document.createElement('item-detail');
      restaurantDetailElement.datas = movie?.restaurant;
      detailElement.innerHTML = '';
      detailElement.appendChild(restaurantDetailElement);
    } catch (error) {
      console.log(error);
      detailElement.innerHTML = `Error fetching data. Please try again later. Error message: ${error.message}`;
    }
  },
};

export default Detail;

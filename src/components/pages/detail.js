import fetchData from '../../api/api';
import { apiEndpoint } from '../../scripts/const';
import UrlParser from '../../scripts/routes/url-parser';
import { error404 } from '../molecules/empty-page';
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
      detailElement.innerHTML = error404();
    }
  },
};

export default Detail;
